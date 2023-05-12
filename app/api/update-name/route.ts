import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getCustomError, parseJsonReq } from "../../../lib/api-utils";

export async function POST(request: Request) {
    try {
        const req = await parseJsonReq(request);
        const { name, slug } = req;

        if (!name || !slug || typeof name !== "string" || typeof slug !== "string")
            throw getCustomError("Name and slug are required, and they must be a string", 400);

        // Write to DB
        const updatedResult = await prisma.result.update({
            where: {
                slug: slug,
            },
            data: {
                name: name,
            },
        });
        return NextResponse.json(updatedResult);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: err.customCode ? err.customCode : 500 });
    }
}
