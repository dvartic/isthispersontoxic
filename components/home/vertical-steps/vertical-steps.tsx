"use client";

import { Box, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { Step } from "./step";
import { StepContent } from "./step-content";
import { Steps } from "./steps";
import { useSteps } from "./use-steps";
import stepsBg from "/public/steps/steps-bg.png";
import step1 from "/public/steps/1.png";
import step2 from "/public/steps/2.png";
import step3 from "/public/steps/3.png";
import step4 from "/public/steps/4.png";
import NextImage from "next/image";
import { motion, Variants, useAnimate } from "framer-motion";

export function VerticalSteps() {
    const { activeStep, setActiveStep } = useSteps({ initialStep: 0 });

    function activeImage() {
        return [step1, step2, step3, step4][activeStep];
    }

    // Media query for viewport scroll detection. Disable image animation on small height screens.
    const [isHeightSmallerThan750] = useMediaQuery("(max-height: 750px)");

    // Animation variants
    function getVariantsBasedOnBoolean(bool: boolean) {
        if (bool) {
            return {
                offscreen: { x: 0, opacity: 1 },
                onscreen: { x: 0, opacity: 1 },
            };
        }
        return {
            offscreen: {
                x: 30,
                opacity: 0,
                transition: {
                    duration: 0.5,
                },
            },
            onscreen: {
                x: 0,
                opacity: 1,
                transition: {
                    duration: 0.5,
                },
            },
        };
    }
    const scrollAnimVariants: Variants = {
        ...getVariantsBasedOnBoolean(isHeightSmallerThan750),
    };

    // Manual animation for steps image
    const [scope, animate] = useAnimate();

    async function animateImage() {
        await animate(scope.current, { opacity: 0 }, { duration: 0 });
        await animate(scope.current, { opacity: 1 }, { duration: 1 });
    }

    return (
        <Stack
            w="100%"
            spacing={{ base: 1, sm: 4 }}
            direction={{ base: "column", sm: "column", md: "row" }}
            align="center"
        >
            <Box py={{ base: "5", sm: "5", md: "10" }} px={{ base: "6", md: "8" }} minH="400px">
                <Steps activeStep={activeStep}>
                    <Step title="Enter comment" setActiveStep={setActiveStep}>
                        <StepContent>
                            <Stack shouldWrapChildren spacing="4">
                                <Text>Introduce a text or comment made by someone.</Text>
                            </Stack>
                        </StepContent>
                    </Step>

                    <Step title="Data is analyzed" setActiveStep={setActiveStep}>
                        <StepContent>
                            <Stack shouldWrapChildren spacing="4">
                                <Text>
                                    Data is analyzed by an AI/ML model powered by Perspective API, on various
                                    attributes.
                                </Text>
                            </Stack>
                        </StepContent>
                    </Step>

                    <Step title="Get report" setActiveStep={setActiveStep}>
                        <StepContent>
                            <Stack shouldWrapChildren spacing="4">
                                <Text>A report is built based on the results provided by the model.</Text>
                            </Stack>
                        </StepContent>
                    </Step>

                    <Step title="Share!" setActiveStep={setActiveStep}>
                        <StepContent>
                            <Stack shouldWrapChildren spacing="4">
                                <Text>Share the results with your friends or use them as you see fit.</Text>
                            </Stack>
                        </StepContent>
                    </Step>
                </Steps>
            </Box>
            {/* Image that changes based on activeStep */}
            <Box
                w={{ base: "100%", sm: "100%", md: "50%" }}
                h={{ base: "400px", sm: "500px", md: "400px", lg: "550px" }}
                position="relative"
                as={motion.div}
                variants={scrollAnimVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ amount: 0.75 }}
            >
                <NextImage
                    src={stepsBg}
                    alt="Steps background"
                    fill={true}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ zIndex: 0, objectFit: "contain" }}
                    placeholder="blur"
                />

                <Box w="100%" h="100%" position="relative">
                    <NextImage
                        src={activeImage()}
                        alt="Steps Image"
                        fill={true}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ zIndex: 1, objectFit: "contain" }}
                        placeholder="blur"
                        ref={scope}
                        onLoadingComplete={animateImage}
                    />
                </Box>
            </Box>
        </Stack>
    );
}
