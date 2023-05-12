# Project that provides reports on toxicity of a comment

[https://www.isthispersontoxic.com/](https://www.isthispersontoxic.com/)

This project is a simple application that generates reports for a comment using [Perspective API](https://perspectiveapi.com/) and allows you to share them.

## What technologies did I use and why?

-   [React.js](https://reactjs.org/): React is very flexible, has great support and is one of the prime libraries used to build user interfaces.
-   [Next.js](https://nextjs.org/): Next is a serverless backend framework that enables many rendering options. In this website, static pages are generated ahead of time, while reports are generated server side per quest (SSG).
-   [ChakraUI](https://chakra-ui.com/): Chakra is one of the main component libraries for React and allows fast development.
-   [Framer Motion](https://www.framer.com/motion/): an animation library for React.
-   [Prisma](https://www.prisma.io/): Node.js and TypeScript ORM.
-   [MongoDB](https://www.mongodb.com/): fast scalable no-SQL database adequate for data that lacks complex relations.
-   [Perspective API](https://perspectiveapi.com/): Google's API that uses ML to identify toxicity.
-   [TypeScript](https://www.typescriptlang.org/): provides static typing to JavaScript.
-   [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote): efficiently loads MarkdownX content through `generateStaticParams()` in Next.js.
-   [MarkdownX](https://mdxjs.com/): allows injecting of JSX in Markdown files.

## Why did I make this project?

It is fun to be able to analyze comments and get a report with, optionally, a name, and being able to share it.

## See also:

-   Perspective API: https://perspectiveapi.com/
