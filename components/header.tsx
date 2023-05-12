"use client";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, IconButton, Link, useColorMode, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import NextLink from "next/link";
import { baseStyles } from "@/theme/base";
import { useSelectedLayoutSegments } from "next/navigation";

const { stdWidths } = baseStyles;

export function Header() {
    const segments = useSelectedLayoutSegments();
    const bgLightModeBasedOnPath = segments.length === 1 ? "rgba(255,255,255, 0.9)" : "rgba(237,242,247, 0.9)";

    const { colorMode, toggleColorMode } = useColorMode();
    const svgBorder = useColorModeValue("gray.200", "gray.700");
    const logoColorGreen = useColorModeValue("green.700", "green.500");
    const logoColorRed = useColorModeValue("red.700", "red.500");
    const bg = useColorModeValue(bgLightModeBasedOnPath, "rgba(15, 23, 42, 0.04)");

    // Detects wether the device supports hover or not through a media query, and executes a simple logic to assign a different text-decoration property.
    const [isHoverNotSupported] = useMediaQuery("(hover: none)");
    const hoverLogo = () => (isHoverNotSupported ? { textDecoration: "none" } : { textDecoration: "underline" });

    return (
        <Box
            w="100%"
            position="sticky"
            top="0"
            zIndex={50}
            boxShadow="sm"
            backdropFilter="blur(4px)"
            backgroundColor={bg}
        >
            <Flex
                align="center"
                justify="center"
                ml="auto"
                mr="auto"
                w={stdWidths.width}
                maxW={stdWidths.maxWidth}
                pt={6}
                pb={6}
            >
                <Link ml="auto" href="/" as={NextLink} _hover={hoverLogo()}>
                    <Heading as="h1" size="lg">
                        <Box as="span">isThis</Box>
                        <Box as="span" color={logoColorGreen}>
                            Person
                        </Box>
                        <Box as="span" color={logoColorRed}>
                            Toxic
                        </Box>
                    </Heading>
                </Link>

                <IconButton
                    ml="auto"
                    size="md"
                    bg="transparent"
                    border="1px"
                    borderColor={svgBorder}
                    aria-label="Change Color Theme"
                    icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                />
            </Flex>
        </Box>
    );
}
