import { NextResponse } from "next/server";
import { getCustomError, parseJsonReq } from "../../../lib/api-utils";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: Request) {
    try {
        const req = await parseJsonReq(request);

        if (
            typeof req.name !== "string" ||
            typeof req.email !== "string" ||
            typeof req.message !== "string" ||
            typeof req.checkbox !== "string"
        ) {
            throw getCustomError("Unexpected contact body format", 400);
        }

        await sendgrid.send({
            to: {
                email: "pepewow3000@gmail.com",
            },
            from: {
                email: "agcascallar@gmail.com",
                name: "Contacto isThisPersonToxic",
            },
            templateId: "d-a4aa8ac89cfd4d58879b4004815a1594",
            dynamicTemplateData: {
                name: req.name,
                email: req.email,
                message: req.message,
                checkbox: req.checkbox,
            },
        });

        return NextResponse.json({ error: "" }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: err.customCode ? err.customCode : 500 });
    }
}
