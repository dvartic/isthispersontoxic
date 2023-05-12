import { Result } from "@prisma/client";
import prisma from "../../../lib/prisma";
import { Report } from "@/components/report/report";
import { Share } from "@/components/report/share";
import type { Metadata } from "next";
import { floatToPercentString } from "@/lib/general-utils";

interface Props {
    params: { reportid: string };
}

async function getResultBySlug(slug: string) {
    return await prisma.result.findFirst({
        where: {
            slug: slug,
        },
    });
}

export async function generateStaticParams() {
    // Get all slugs
    const reportWithSlug = await prisma.result.findMany({
        select: {
            slug: true,
        },
    });

    // Return slugs
    return reportWithSlug.map((report) => {
        return {
            reportid: report.slug,
        };
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const reportid = params.reportid;
    const result = (await getResultBySlug(reportid)) as Result;

    const name = result.name;
    const toxicity = result.toxicity;
    const toxicityString = floatToPercentString(toxicity);

    return {
        title: name ? `isThisPersonToxic Report on ${name}` : "isThisPersonToxic Report",
        description: name
            ? `Report on ${name} that resulted being ${toxicityString} toxic`
            : `Report on a comment that resulted being ${toxicityString} toxic`,
    };
}

export default async function Home({ params }: Props) {
    const reportid = params.reportid;

    const result = (await getResultBySlug(reportid)) as Result;

    let name: string | null = null;
    if (result) name = result.name;

    return (
        <main>
            <Report result={result} slug={reportid} />
            <Share name={name} />
        </main>
    );
}
