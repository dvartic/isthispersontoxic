"use client";

import { Button, Heading, Stack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { RadLogo } from "../svgs/rad-logo";
import NextLink from "next/link";
import { baseStyles } from "@/theme/base";

const { stdWidths } = baseStyles;

export function Banner() {
    const acercaDeColor = useColorModeValue("gray.600", "gray.500");
    const svgColor = useColorModeValue("gray.700", "gray.200");
    return (
        <Stack
            direction={{ base: "column", sm: "column", md: "row" }}
            align="center"
            w={stdWidths.width}
            maxW={stdWidths.maxWidth}
            ml="auto"
            mr="auto"
            mt={20}
            mb={16}
            pb={4}
            spacing={{ base: 16, sm: 20, md: 10, lg: 16 }}
            borderBottom="1px"
        >
            <VStack
                align={{ base: "center", sm: "center", md: "start" }}
                textAlign={{ base: "center", sm: "center", md: "start" }}
                spacing={6}
            >
                <Text fontSize={{ base: "sm", sm: "md", md: "sm", lg: "md" }} color={acercaDeColor}>
                    ABOUT US
                </Text>
                <Heading as="h1" fontSize={{ base: "3xl", sm: "4xl", md: "4xl", lg: "5xl" }}>
                    Analyzing toxicity and providing reports for comments
                </Heading>
                <Text fontSize={{ base: "sm", sm: "md", md: "md", lg: "lg" }}>
                    We utilize Perspective API to generate reports on comments and allow you to share them in a fun way.
                </Text>
                <Button size={{ base: "sm", sm: "md", md: "md" }} colorScheme="green" as={NextLink} href="/">
                    Analyze
                </Button>
            </VStack>
            {/* SVG ICON */}
            <RadLogo color={svgColor} w={{ base: "60%", sm: "50%", md: "40%", lg: "30%" }} h="100%" />
        </Stack>
    );
}
