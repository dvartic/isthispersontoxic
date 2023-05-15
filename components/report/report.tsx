"use client";

import { Box, Collapse, Flex, Heading, Link, Text, VStack, Wrap, WrapItem, useColorModeValue } from "@chakra-ui/react";
import { Result } from "@prisma/client";
import { baseStyles } from "@/theme/base";
import { StatCard } from "./stat-card";
import { featuresData } from "../definitions";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { UpdateNameInput } from "./update-name";

const { stdWidths } = baseStyles;

interface Props {
    result: Result | null | undefined;
    slug: string;
}

export function Report({ result, slug }: Props) {
    const [nameBeenAdded, setNameBeenAdded] = useState<null | string>(null);

    const logoColorGreen = useColorModeValue("green.700", "green.500");
    const logoColorRed = useColorModeValue("red.700", "red.500");
    const bg = useColorModeValue("gray.100", "gray.800");
    const commentBg = useColorModeValue("white", "black");

    let name: null | string = null;
    if (result?.name) name = result.name;
    else if (nameBeenAdded) name = nameBeenAdded;

    function getCommentComp() {
        if (name) {
            return (
                <Text alignSelf="start" fontSize={{ base: "xl", sm: "2xl" }}>
                    <Box as="i" fontWeight="bold">
                        {name}
                    </Box>
                    <Box as="span" fontWeight="medium">
                        {" "}
                        made the following comment:
                    </Box>
                </Text>
            );
        } else {
            return (
                <Text alignSelf="start" fontWeight="medium" fontSize={{ base: "xl", sm: "2xl" }}>
                    The person made the following comment:
                </Text>
            );
        }
    }

    function evaluateToxicity(result: Result) {
        const toxicity = result.toxicity;

        if (toxicity < 0.3) return "Not Toxic";
        if (toxicity >= 0.3 && toxicity < 0.5) return "Unlikely to be Toxic";
        if (toxicity >= 0.5 && toxicity < 0.7) return "Somewhat Toxic";
        if (toxicity >= 0.7 && toxicity < 0.9) return "Very Toxic";
        if (toxicity >= 0.9) return "Extremely Toxic";
    }

    // Animations
    const cardVariants: Variants = {
        offscreen: {
            opacity: 0,
            x: 10,
            transition: {
                duration: 0.5,
            },
        },
        onscreen: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const basicVariants: Variants = {
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
            },
        },
    };

    return (
        <VStack
            w={stdWidths.width}
            maxW={stdWidths.maxWidth}
            mx="auto"
            spacing={{ base: 6, sm: 10 }}
            my={{ base: 8, sm: 14 }}
            align="start"
        >
            {/* Update Name */}
            <Collapse in={name ? false : true}>
                <VStack align="start" w="100%">
                    <Text fontWeight="bold">Add a name to be included in your report</Text>
                    <UpdateNameInput setNameBeenAdded={setNameBeenAdded} slug={slug} />
                </VStack>
            </Collapse>

            {/* Main Report */}
            <VStack align="center" w="100%" p={10} bg={bg} borderRadius="md" spacing={8}>
                <VStack w="100%" align="center" spacing={{ base: 5, sm: 0 }}>
                    <Text fontWeight="bold" alignSelf="start">
                        <Box as="span">isThis</Box>
                        <Box as="span" color={logoColorGreen}>
                            Person
                        </Box>
                        <Box as="span" color={logoColorRed}>
                            Toxic
                        </Box>
                    </Text>
                    <Heading as="h1" fontSize={{ base: "4xl", sm: "5xl" }}>
                        Toxicity Report
                    </Heading>
                </VStack>

                <VStack
                    align="start"
                    w="100%"
                    as={motion.div}
                    variants={basicVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ amount: "some" }}
                >
                    {getCommentComp()}
                    <VStack align="start" borderRadius="md" bg={commentBg} p={8} w="100%">
                        <Text
                            fontSize={{
                                base: "3xl",
                                sm: "4xl",
                                md: "5xl",
                            }}
                            fontFamily="pt-serif, serif"
                            position="relative"
                            bottom={{ base: 2, sm: 3, md: 6 }}
                            right={{ base: 3, sm: 4, md: 6 }}
                            h={0}
                        >
                            “
                        </Text>
                        <Text as="i" fontSize={{ base: "md", sm: "lg" }}>
                            {result?.comment}
                        </Text>
                    </VStack>
                </VStack>

                {/* Main report cards */}
                <VStack align="center" w="100%" spacing={8}>
                    <Text
                        fontSize={{ base: "xl", sm: "2xl" }}
                        alignSelf="start"
                        as={motion.p}
                        variants={basicVariants}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ amount: "some" }}
                    >
                        <Box as="span" fontWeight="bold">
                            Result:{" "}
                        </Box>
                        <Box as="i">{result ? evaluateToxicity(result) : null}</Box>
                    </Text>

                    {/* Statistic Cards */}
                    <VStack spacing={{ base: 6, sm: 12 }}>
                        <motion.div
                            variants={cardVariants}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ amount: "some" }}
                        >
                            <StatCard
                                label={featuresData[0].title}
                                // @ts-ignore
                                value={result[featuresData[0].attr]}
                                description={featuresData[0].description}
                                icon={featuresData[0].icon}
                            />
                        </motion.div>

                        <Wrap justify="center" spacing={8}>
                            {featuresData.map((feature, index) => {
                                if (index > 0) {
                                    return (
                                        <WrapItem key={index}>
                                            <motion.div
                                                variants={cardVariants}
                                                initial="offscreen"
                                                whileInView="onscreen"
                                                viewport={{ amount: "some" }}
                                            >
                                                <StatCard
                                                    label={feature.title}
                                                    // @ts-ignore
                                                    value={result[feature.attr]}
                                                    description={feature.description}
                                                    icon={feature.icon}
                                                />
                                            </motion.div>
                                        </WrapItem>
                                    );
                                }
                            })}
                        </Wrap>
                    </VStack>
                    {/* Color Scale */}
                    <VStack w="100%" maxW="560px" alignSelf="start" spacing={1}>
                        <Flex w="100%" justify="space-between" fontSize="sm">
                            <Text as="i">0%</Text>
                            <Text as="i">100%</Text>
                        </Flex>
                        <Box w="100%" h={3} bgGradient="linear(to-r, white, red)" borderRadius="lg" />
                    </VStack>
                    <Text alignSelf="start" as="i">
                        * Values indicate likelihood of comment to be perceived as toxic. More information at{" "}
                        <Link href="https://perspectiveapi.com/" isExternal color="blue.500">
                            Perspective API.
                        </Link>
                    </Text>
                </VStack>
            </VStack>
        </VStack>
    );
}
