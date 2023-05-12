"use client";

import { Box, Heading, VStack, useColorModeValue } from "@chakra-ui/react";
import { VerticalSteps } from "./vertical-steps/vertical-steps";
import { baseStyles } from "@/theme/base";
import { motion, Variants } from "framer-motion";

const { stdWidths } = baseStyles;

export function StepsMain() {
    const bg = useColorModeValue("white", "black");

    const titleVariants: Variants = {
        offscreen: {
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        onscreen: {
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <Box w="100%" bg={bg} py={{ base: 24, sm: 32 }} position="relative" zIndex={10}>
            <VStack
                w={stdWidths.width}
                maxW={stdWidths.maxWidth}
                ml="auto"
                mr="auto"
                align="center"
                spacing={{ base: 6, sm: 10, md: 16 }}
            >
                <Heading
                    as={motion.h2}
                    variants={titleVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ amount: "all" }}
                    fontSize="5xl"
                >
                    How It Works
                </Heading>
                <VerticalSteps />
            </VStack>
        </Box>
    );
}
