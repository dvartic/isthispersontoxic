"use client";

import { Box, Stack, Text, useColorModeValue as mode } from "@chakra-ui/react";
import * as React from "react";

interface FeatureProps {
    icon: React.ReactElement;
    title: string;
    children: React.ReactNode;
}

export const Feature = (props: FeatureProps) => {
    const { title, children, icon } = props;
    return (
        <Box>
            <Box color={mode("red.800", "red.600")} fontSize="5xl">
                {icon}
            </Box>
            <Stack mt={{ base: "2", sm: "6" }}>
                <Text as="h3" color={mode("red.500", "red.300")} fontSize="xl" fontWeight="extrabold">
                    {title}
                </Text>
                <Text pr="6" lineHeight="tall">
                    {children}
                </Text>
            </Stack>
        </Box>
    );
};

export default Feature;
