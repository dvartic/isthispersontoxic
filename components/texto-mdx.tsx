"use client";

import { Box } from "@chakra-ui/react";
import { MDXRemote } from "next-mdx-remote";
import MDXComponents from "./mdx-components";
import { baseStyles } from "@/theme/base";
import { motion } from "framer-motion";

const { stdWidths } = baseStyles;

export function TextoMdx({ src }: any) {
    return (
        <Box
            w={stdWidths.width}
            maxWidth={stdWidths.maxWidth}
            ml="auto"
            mr="auto"
            mb={{ base: 12, sm: 16, md: 20 }}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <MDXRemote {...src} components={MDXComponents} />
        </Box>
    );
}
