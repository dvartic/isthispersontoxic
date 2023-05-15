"use client";

import {
    Box,
    Button,
    Center,
    Divider,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue as mode,
    useMediaQuery,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { Feature } from "./features/feature";
import NextImage from "next/image";
import trashImage from "/public/features/trash.jpg";
import { motion, Variants } from "framer-motion";
import { featuresData } from "../definitions";

export function FeaturesMain() {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

    // Media query for viewport scroll detection. Disable image animation on small height screens.
    const [isHeightSmallerThan750] = useMediaQuery("(max-height: 750px)");

    function scrollToInput() {
        const target = document.getElementById("main-input");
        target?.scrollIntoView({ behavior: "smooth" });
        target?.focus({ preventScroll: true });
    }

    // Animation Variants
    const featuresMainVariants: Variants = {
        offscreen: {
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.5,
            },
        },
        onscreen: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    const dividerVariants: Variants = {
        offscreen: {
            width: "0%",
            transition: {
                duration: 0.5,
            },
        },
        onscreen: {
            width: "100%",
            transition: {
                duration: 0.5,
            },
        },
    };

    const gridVariants: Variants = {
        offscreen: {
            opacity: 0,
            transition: {
                duration: 0.3,
            },
        },
        onscreen: {
            opacity: 1,
            transition: {
                duration: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    };

    const featureElVariants: Variants = {
        offscreen: {
            opacity: 0,
            x: -20,
            transition: {
                duration: 0.3,
            },
        },
        onscreen: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
            },
        },
    };
    return (
        <Box as="section" bg={mode("gray.50", "gray.900")} py={{ base: "16", sm: "36" }}>
            <Box maxW={{ base: "xl", md: "7xl" }} mx="auto" px={{ base: "6", md: "8" }}>
                <Stack
                    spacing={{ base: "4", lg: "20" }}
                    direction={{ base: "column", lg: "row" }}
                    as={motion.div}
                    variants={featuresMainVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ amount: isHeightSmallerThan750 ? 0.1 : 0.2 }}
                >
                    <Center flex="1" shadow="lg" minH="26rem" maxW={{ lg: "xl" }} position="relative">
                        <NextImage src={trashImage} fill={true} alt="A pile of trash" style={{ objectFit: "cover" }} />
                    </Center>
                    <Box maxW={{ lg: "lg" }}>
                        <Heading size="2xl" mt="10" fontWeight="extrabold" letterSpacing="tight" lineHeight="normal">
                            Using ML to detect a range of potentially harmful attributes
                        </Heading>
                        <Text fontSize="lg" mt="6" color={mode("gray.600", "gray.400")}>
                            Our report will provide a score for several attributes, not just toxicity.
                        </Text>
                        <Button
                            className="group"
                            mt="8"
                            colorScheme="green"
                            size="lg"
                            px="8"
                            fontWeight="bold"
                            h="14"
                            iconSpacing="3"
                            onClick={scrollToInput}
                            rightIcon={
                                <Box
                                    as={FaArrowRight}
                                    fontSize="sm"
                                    transition="transform 0.2s"
                                    _groupHover={{ transform: "translateX(2px)" }}
                                />
                            }
                        >
                            Get started
                        </Button>
                    </Box>
                </Stack>
                <Divider
                    my={{ base: "10", sm: "20" }}
                    ml="auto"
                    mr="auto"
                    opacity={1}
                    as={motion.hr}
                    variants={dividerVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ amount: "all" }}
                />
                {isSmallerThan768 ? (
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: "8", md: "10" }}>
                        {featuresData.map((feature, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    variants={featureElVariants}
                                    initial="offscreen"
                                    whileInView="onscreen"
                                    viewport={{ amount: 0.3 }}
                                >
                                    <Feature title={feature.title} icon={feature.icon}>
                                        {feature.description}
                                    </Feature>
                                </motion.div>
                            );
                        })}
                    </SimpleGrid>
                ) : (
                    <SimpleGrid
                        columns={{ base: 1, md: 3 }}
                        spacing={{ base: "12", md: "8" }}
                        as={motion.div}
                        variants={gridVariants}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ amount: 0.3 }}
                    >
                        {featuresData.map((feature, index) => {
                            return (
                                <motion.div key={index} variants={featureElVariants}>
                                    <Feature title={feature.title} icon={feature.icon}>
                                        {feature.description}
                                    </Feature>
                                </motion.div>
                            );
                        })}
                    </SimpleGrid>
                )}
            </Box>
        </Box>
    );
}
