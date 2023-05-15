"use client";

import {
    Box,
    Button,
    Heading,
    Stack,
    Text,
    useColorModeValue,
    Flex,
    Textarea,
    FormControl,
    FormErrorMessage,
    useToast,
} from "@chakra-ui/react";
import { RadLogo } from "../svgs/rad-logo";
import { motion, Variants } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type FormInput = {
    comment: string;
};

export function Hero() {
    // Initialize router
    const router = useRouter();

    // Intialize Chakra toast
    const toast = useToast();

    // React Hook Form state management and validation
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormInput>();

    // Delay isSubmitting variable a few seconds to improve user experience
    const [isSubmittingDelayed, setIsSubmittingDelayed] = useState(false);

    console.log(isSubmittingDelayed);

    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {
            if (isSubmitting) setIsSubmittingDelayed(true);
            if (!isSubmitting) {
                const timeoutId = setTimeout(() => setIsSubmittingDelayed(false), 3000);
                return () => clearTimeout(timeoutId);
            }
        } else didMount.current = true;
    }, [isSubmitting]);

    const onSubmit: SubmitHandler<FormInput> = async (data) => {
        const res = await fetch("/api/comment-analyzer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comment: data.comment,
            }),
        });
        if (!res.ok) {
            // Handle errors
            const resJson = await res.json();
            toast({
                title: "Error:",
                id: "idError",
                description: resJson.error,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        } else {
            // Handle success
            type ResJson = {
                slug: string;
            };
            const resJson: ResJson = await res.json();
            const slug = resJson.slug;
            router.push(`/report/${slug}`);
        }
    };

    const textAreaBg = useColorModeValue("gray.50", "gray.700");
    const logoColor = useColorModeValue("red.700", "red.500");
    const bg = useColorModeValue("gray.100", "gray.900");

    // Animations

    const compVariants: Variants = {
        hidden: {
            opacity: 0,
            scale: 0.5,
        },
        onscreen: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
            },
        },
    };

    return (
        <Box w="100%" minH="100vh" bg={bg}>
            <Box as={motion.div} w="100%">
                <Box as="section" py={{ base: "4rem", sm: "5.5rem", md: "7.5rem" }} maxW="700px" ml="auto" mr="auto">
                    <Box
                        maxW={{ base: "xl", md: "5xl" }}
                        mx="auto"
                        px={{ base: "6", md: "8" }}
                        as={motion.div}
                        variants={compVariants}
                        initial="hidden"
                        animate="onscreen"
                    >
                        <Box textAlign="center">
                            <Heading
                                as="h1"
                                size="3xl"
                                fontWeight="extrabold"
                                maxW="48rem"
                                mx="auto"
                                lineHeight="1.2"
                                letterSpacing="tight"
                            >
                                Find out if someone is{" "}
                                <Box as="span" color={logoColor}>
                                    toxic
                                </Box>
                            </Heading>
                            <Text fontSize="xl" mt="4" maxW="xl" mx="auto">
                                Get a report describing the level of toxicity. Powered by AI.
                            </Text>
                        </Box>

                        <Stack
                            as="form"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            justify="center"
                            direction="column"
                            mt="10"
                            mb="20"
                            spacing="4"
                        >
                            <FormControl isInvalid={"comment" in errors} w="100%">
                                <Textarea
                                    id="main-input"
                                    scrollMarginTop="150px"
                                    placeholder="Enter comment"
                                    bg={textAreaBg}
                                    {...register("comment", {
                                        required: "Please enter a comment",
                                        minLength: {
                                            value: 2,
                                            message: "Minimum length is 2",
                                        },
                                        maxLength: {
                                            value: 15000,
                                            message: "Maximum length is 15000",
                                        },
                                    })}
                                />
                                <Box h={2} mt={{ base: 1.5, sm: 2 }}>
                                    <FormErrorMessage mt={0} mb={0}>
                                        {errors.comment?.message}
                                    </FormErrorMessage>
                                </Box>
                            </FormControl>
                            <Button
                                w="100%"
                                colorScheme="green"
                                type="submit"
                                isLoading={isSubmittingDelayed}
                                loadingText="Loading"
                            >
                                Run
                            </Button>
                        </Stack>
                        <Flex justify="center" align="center">
                            <RadLogo boxSize={{ base: "2xs", sm: "xs" }} />
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

// <Box as="form" onSubmit={handleSubmit(onSubmit)} noValidate w="100%">
