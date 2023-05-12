"use client";

import { Box, Button, ButtonGroup, Divider, IconButton, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { FaCode, FaGithub } from "react-icons/fa";
import NextLink from "next/link";
import { baseStyles } from "@/theme/base";

const { stdWidths } = baseStyles;

export function Footer() {
    const topBorderColor = useColorModeValue("gray.400", "gray.500");
    const bg = useColorModeValue("gray.50", "gray.900");

    return (
        <Box w="100%" borderTop="1px" borderColor={topBorderColor} bg={bg}>
            <Box as="footer" role="contentinfo" ml="auto" mr="auto" w={stdWidths.width} maxW={stdWidths.maxWidth}>
                <Stack
                    spacing="8"
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    py={{ base: "12", md: "16" }}
                >
                    <Stack spacing={{ base: "6", md: "8" }} align="start">
                        <Box as="h1" fontSize="lg">
                            <Box as="span">isThis</Box>
                            <Box as="span" color="green.700">
                                Person
                            </Box>
                            <Box as="span" color="red.700">
                                Toxic
                            </Box>
                        </Box>
                        <Text color="muted">Find out if a person is being toxic.</Text>
                    </Stack>
                    <Stack
                        direction={{ base: "column-reverse", md: "column", lg: "row" }}
                        spacing={{ base: "12", md: "8" }}
                    >
                        <Stack direction="row" spacing="8">
                            <Stack spacing="4" minW="36" flex="1">
                                <Text fontSize="sm" fontWeight="semibold" color="subtle">
                                    Product
                                </Text>
                                <Stack spacing="3" shouldWrapChildren>
                                    <Button as={NextLink} href="/" variant="link">
                                        Home
                                    </Button>
                                    <Button as={NextLink} href="/about-us" variant="link">
                                        About Us
                                    </Button>
                                </Stack>
                            </Stack>
                            <Stack spacing="4" minW="36" flex="1">
                                <Text fontSize="sm" fontWeight="semibold" color="subtle">
                                    Legal
                                </Text>
                                <Stack spacing="3" shouldWrapChildren>
                                    <Button as={NextLink} href="/privacy" variant="link">
                                        Privacy
                                    </Button>
                                    <Button as={NextLink} href="/terms" variant="link">
                                        Terms
                                    </Button>
                                    <Button as={NextLink} href="/cookies" variant="link">
                                        Cookies
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
                <Divider />
                <Stack
                    pt="8"
                    pb="12"
                    justify="space-between"
                    direction={{ base: "column-reverse", md: "row" }}
                    align="center"
                >
                    <Text fontSize="sm" color="subtle">
                        {new Date().getFullYear()} Made by Dvartic. This work is uncopyrighted.
                    </Text>
                    <ButtonGroup variant="ghost">
                        <IconButton
                            as="a"
                            href="https://www.dvartic.xyz/"
                            aria-label="GitHub"
                            icon={<FaCode fontSize="1.25rem" />}
                            target="_blank"
                        />

                        <IconButton
                            as="a"
                            href="https://github.com/dvartic"
                            aria-label="GitHub"
                            icon={<FaGithub fontSize="1.25rem" />}
                            target="_blank"
                        />
                    </ButtonGroup>
                </Stack>
            </Box>
        </Box>
    );
}
