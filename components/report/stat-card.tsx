"use client";

import { InfoIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Heading, Text, Tooltip } from "@chakra-ui/react";
import { floatToPercentString } from "@/lib/general-utils";

interface Props {
    label: string;
    value: number;
    description: string;
    icon: React.ReactElement;
}

export function StatCard({ label, value, icon, description }: Props) {
    function getColorScale(value: number) {
        const red = 255;
        const green = Math.round(255 * (1 - value));
        const blue = Math.round(255 * (1 - value));
        return `rgb(${red}, ${green}, ${blue})`;
    }

    return (
        <Box bg={getColorScale(value)} p={8} shadow="base" rounded="lg" w="290px" color="black">
            <Flex justify="space-between" align="start">
                <HStack align="center">
                    <Box fontSize="4xl">{icon}</Box>

                    <Text fontWeight="bold" fontSize="xl">
                        {label}
                    </Text>
                </HStack>
                <Tooltip label={description} fontSize="md">
                    <InfoIcon position="relative" bottom="2px" boxSize="6" />
                </Tooltip>
            </Flex>

            <Heading as="h4" size="2xl" mt="4" fontWeight="extrabold">
                {floatToPercentString(value)}
            </Heading>
        </Box>
    );
}
