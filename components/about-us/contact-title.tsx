"use client";

import { Heading, Text, VStack } from "@chakra-ui/react";
import { baseStyles } from "@/theme/base";

const { stdWidths } = baseStyles;

export function ContactTitle() {
    return (
        <VStack
            w={stdWidths.width}
            maxW={stdWidths.maxWidth}
            mx="auto"
            align="center"
            textAlign="center"
            spacing={6}
            mt={24}
        >
            <Heading fontSize={{ base: "2xl", sm: "3xl", md: "3xl", lg: "4xl" }}>Contact us</Heading>
            <Text fontSize={{ base: "xs", sm: "sm", md: "sm", lg: "md" }}>
                We love to hear from our users. Please don&apos;t hesitate to reach out to us with any questions or
                suggestions.
            </Text>
        </VStack>
    );
}
