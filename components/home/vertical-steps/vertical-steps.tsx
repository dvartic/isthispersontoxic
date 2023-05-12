"use client";

import { Box, Stack, Text } from "@chakra-ui/react";
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
import { motion, Variants } from "framer-motion";

export function VerticalSteps() {
    const { activeStep, setActiveStep } = useSteps({ initialStep: 0 });

    function activeImage() {
        return [step1, step2, step3, step4][activeStep];
    }

    const scrollAnimVariants: Variants = {
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

    return (
        <Stack w="100%" spacing={4} direction={{ base: "column", sm: "column", md: "row" }} align="center">
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
                w="50%"
                h={{ base: "250px", sm: "350px", md: "400px", lg: "550px" }}
                position="relative"
                as={motion.div}
                variants={scrollAnimVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ amount: 0.7 }}
            >
                <NextImage
                    src={stepsBg}
                    alt="Steps background"
                    fill={true}
                    style={{ zIndex: 0, objectFit: "contain" }}
                    placeholder="blur"
                />

                <Box
                    w="100%"
                    h="100%"
                    position="relative"
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, scale: 1.1 }}
                    key={activeStep}
                >
                    <NextImage
                        src={activeImage()}
                        alt="Steps Image"
                        fill={true}
                        style={{ zIndex: 1, objectFit: "contain" }}
                        placeholder="blur"
                    />
                </Box>
            </Box>
        </Stack>
    );
}
