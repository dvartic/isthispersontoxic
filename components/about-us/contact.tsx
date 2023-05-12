"use client";

import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormErrorMessage,
    Input,
    InputGroup,
    InputLeftElement,
    Link,
    Textarea,
    useColorModeValue,
    useMediaQuery,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import NextLink from "next/link";
import { ArrowForwardIcon } from "@chakra-ui/icons";

type FormInput = {
    name: string;
    email: string;
    message: string;
    checkbox: string;
};

export function ContactForm() {
    // React Hook Form state management and validation
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormInput>();

    // Chakra Toast component
    const toast = useToast();

    // Function to handle form submission. Submits form through Next.js API Route, and executes Chakra Toast based on promise result. Avoids submission if Demo Mode enabled.
    const onSubmit: SubmitHandler<FormInput> = async (data) => {
        const res = await fetch("/api/send-contact-email", {
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                message: data.message,
                checkbox: data.checkbox,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        if (!res.ok) {
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
            toast({
                title: "Sent!",
                id: "idSuccess",
                description: "Thank you for contacting us",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            reset(); // Reset form on successful submission
        }
    };

    // Workaround for Chakra issue #6927 regarding responsive sizes in InputGroup
    const [isSmallerThan480] = useMediaQuery("(max-width: 480px)"); // Smaller than sm size
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)"); // Smaller than md size
    function getInputGroupSize() {
        if (isSmallerThan480) return "sm";
        if (isSmallerThan768) return "md";
        return "lg";
    }

    const hoverColor = useColorModeValue("green.500", "green.600");
    const [isHoverNotSupported] = useMediaQuery("(hover: none)");
    const hover = () => (isHoverNotSupported ? { textDecoration: "none" } : { color: hoverColor });

    const bgColor = useColorModeValue("white", "gray.700");
    const iconInputColor = useColorModeValue("#1A365D", "#BEE3F8");
    const placeholderColor = useColorModeValue("blue.900", "blue.100");
    const linkColor = useColorModeValue("green.700", "green.400");
    const checkboxBorderColor = useColorModeValue("gray.300", "gray.600");

    return (
        <Box
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            w="70%"
            maxWidth="700px"
            ml="auto"
            mr="auto"
            mt={20}
            mb={20}
        >
            <VStack spacing={{ base: 2, sm: 5 }}>
                {/* First row of form inputs */}
                <FormControl isInvalid={"name" in errors} w="100%">
                    <InputGroup backgroundColor={bgColor} size={getInputGroupSize()}>
                        <InputLeftElement>
                            <BsPerson color={iconInputColor} />
                        </InputLeftElement>
                        <Input
                            type="text"
                            placeholder="Name"
                            _placeholder={{
                                color: placeholderColor,
                            }}
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Minimum length is 2",
                                },
                                maxLength: {
                                    value: 22,
                                    message: "Maximum length is 22",
                                },
                            })}
                        />
                    </InputGroup>
                    <Box h={2} mt={{ base: 1.5, sm: 2 }}>
                        <FormErrorMessage
                            mt={0}
                            mb={0}
                            fontSize={{
                                base: "2xs",
                                sm: "xs",
                                md: "sm",
                            }}
                        >
                            {errors.name?.message}
                        </FormErrorMessage>
                    </Box>
                </FormControl>

                {/* Second row of form inputs */}
                <FormControl isInvalid={"email" in errors} w="100%">
                    <InputGroup backgroundColor={bgColor} size={getInputGroupSize()}>
                        <InputLeftElement>
                            <MdOutlineEmail color={iconInputColor} />
                        </InputLeftElement>
                        <Input
                            type="email"
                            placeholder="Email"
                            _placeholder={{
                                color: placeholderColor,
                            }}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                                    message: "Invalid email",
                                },
                            })}
                        />
                    </InputGroup>
                    <Box h={2} mt={{ base: 1.5, sm: 2 }}>
                        <FormErrorMessage
                            mt={0}
                            mb={0}
                            fontSize={{
                                base: "2xs",
                                sm: "xs",
                                md: "sm",
                            }}
                        >
                            {errors.email?.message}
                        </FormErrorMessage>
                    </Box>
                </FormControl>

                {/* Third row of form inputs */}
                <FormControl isInvalid={"message" in errors} w="100%">
                    <Textarea
                        backgroundColor={bgColor}
                        placeholder="Message"
                        _placeholder={{ color: placeholderColor }}
                        rows={6}
                        resize="none"
                        {...register("message", {
                            required: "Message is required",
                            minLength: {
                                value: 5,
                                message: "Minimum length is 5",
                            },
                            maxLength: {
                                value: 500,
                                message: "Maximum length is 500",
                            },
                        })}
                    />
                    <Box h={2} mt={{ base: 1.5, sm: 2 }}>
                        <FormErrorMessage mt={0} mb={0}>
                            {errors.message?.message}
                        </FormErrorMessage>
                    </Box>
                </FormControl>
                <Checkbox
                    colorScheme="green"
                    borderColor={checkboxBorderColor}
                    {...register("checkbox", { required: true })}
                    alignSelf="start"
                    value="accept"
                    isInvalid={errors.checkbox ? true : false}
                >
                    By checking this box, you accept our{" "}
                    <Link as={NextLink} href={"/privacy"} color={linkColor} _hover={hover()}>
                        privacy policy.
                    </Link>
                </Checkbox>
                <Button
                    type="submit"
                    colorScheme="green"
                    isLoading={isSubmitting}
                    loadingText="Sending..."
                    rightIcon={<ArrowForwardIcon />}
                >
                    Send
                </Button>
            </VStack>
        </Box>
    );
}
