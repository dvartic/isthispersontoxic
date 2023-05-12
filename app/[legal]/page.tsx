import { TextoMdx } from "@/components/texto-mdx";
import { getFileBySlug, getFiles } from "@/lib/mdx-libs";

export async function generateStaticParams() {
    const paginasLegales = getFiles();
    const paths = paginasLegales.map((element) => {
        return {
            slug: element.replace(/\.mdx/, ""),
        };
    });
    return paths;
}

interface Props {
    params: { legal: string };
}

export default async function PaginasLegales({ params }: Props) {
    const { legal } = params;

    const { src, frontmatter } = await getFileBySlug(legal);

    return (
        <main>
            <TextoMdx src={src} frontMatter={frontmatter} />
        </main>
    );
}
