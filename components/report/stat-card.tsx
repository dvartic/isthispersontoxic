"use client";

import { InfoIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    HStack,
    Heading,
    IconButton,
    LightMode,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Text,
    Tooltip,
    useColorModeValue,
    useMediaQuery,
} from "@chakra-ui/react";
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

    const popoverColor = useColorModeValue("black", "white");

    // Detect hover capability to render either a tooltip or popover
    const [isHoverNotSupported] = useMediaQuery("(hover: none)");

    return (
        <Box bg={getColorScale(value)} p={{ base: 5, sm: 8 }} shadow="base" rounded="lg" w="290px" color="black">
            <Flex justify="space-between" align="start">
                <HStack align="center">
                    <Box fontSize={{ base: "3xl", sm: "4xl" }}>{icon}</Box>

                    <Text fontWeight="bold" fontSize={{ base: "lg", sm: "xl" }}>
                        {label}
                    </Text>
                </HStack>
                {isHoverNotSupported ? (
                    <Popover>
                        <LightMode>
                            <PopoverTrigger>
                                <IconButton
                                    position="relative"
                                    bottom="2px"
                                    variant="ghost"
                                    aria-label="More information on attribute"
                                    icon={<InfoIcon boxSize={{ base: "5", sm: "6" }} />}
                                />
                            </PopoverTrigger>
                        </LightMode>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton color={popoverColor} />
                            <PopoverBody color={popoverColor}>{description}</PopoverBody>
                        </PopoverContent>
                    </Popover>
                ) : (
                    <Tooltip label={description} fontSize="md">
                        <InfoIcon position="relative" bottom="2px" boxSize={{ base: "5", sm: "6" }} />
                    </Tooltip>
                )}
            </Flex>

            <Heading as="h4" size={{ base: "xl", sm: "2xl" }} mt={{ base: "2", sm: "4" }} fontWeight="extrabold">
                {floatToPercentString(value)}
            </Heading>
        </Box>
    );
}
