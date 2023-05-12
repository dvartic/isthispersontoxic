// Helper functions to handle Markdown posts. These functions are called by Next getStaticProps and getStaticPaths at build time.
import { serialize } from "next-mdx-remote/serialize";
import matter from "front-matter";
import fs from "fs";
import path from "path";

// Get current working directory
const root = process.cwd();

// Read content of the directory containing the posts.
export const getFiles = () => fs.readdirSync(path.join(root, "components/mdx-data"));

// Returns contents of a specified file, using the serialize function from next-mdx-remote to process it. Additionally, it returns a version with markdown removed.
export const getFileBySlug = async (slug: string) => {
    const mdxSrc = fs.readFileSync(path.join(root, `components/mdx-data/${slug}.mdx`), "utf-8");
    const { frontmatter, body } = matter(mdxSrc);
    const src = await serialize(body, {});
    return {
        src,
        frontmatter: {
            slug,
            frontmatter,
        },
    };
};

export const serializeContent = async (markdownStr: string) => {
    /* const { frontmatter, body } = await matter(markdownStr); */
    const src = await serialize(markdownStr, {});
    return {
        src,
    };
};
