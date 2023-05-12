import { google } from "googleapis";
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { getCustomError, parseJsonReq } from "../../../lib/api-utils";

export async function POST(request: Request) {
    try {
        const req = await parseJsonReq(request);

        const comment = req.comment;
        if (!comment || typeof comment !== "string")
            throw getCustomError("Comment is required and it must be a string", 400);
        comment as string;

        const discoveryUrl = "https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1";
        const client = await google.discoverAPI(discoveryUrl);

        const resourceObj = {
            comment: {
                text: comment,
            },
            requestedAttributes: {
                TOXICITY: {},
                SEVERE_TOXICITY: {},
                IDENTITY_ATTACK: {},
                INSULT: {},
                PROFANITY: {},
                THREAT: {},
            },
        };

        // @ts-ignore
        const response = await client.comments.analyze({
            key: process.env.GOOGLE_API_KEY,
            resource: resourceObj,
        });

        const filteredObjRes = {
            slug: uuidv4(),
            comment: comment,
            languages: response.data.languages,
            detectedLanguages: response.data.detectedLanguages,
            toxicity: response.data.attributeScores?.TOXICITY.summaryScore.value,
            severeToxicity: response.data.attributeScores?.SEVERE_TOXICITY.summaryScore.value,
            identityAttack: response.data.attributeScores?.IDENTITY_ATTACK.summaryScore.value,
            insult: response.data.attributeScores?.INSULT.summaryScore.value,
            profanity: response.data.attributeScores?.PROFANITY.summaryScore.value,
            threat: response.data.attributeScores?.THREAT.summaryScore.value,
        };

        // Actually write to DB
        await prisma.result.create({
            data: {
                ...filteredObjRes,
            },
        });

        return NextResponse.json(filteredObjRes);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: err.customCode ? err.customCode : 500 });
    }
}
