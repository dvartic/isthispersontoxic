"use client";

import { Box, Button, Stack, Text, useColorModeValue as mode, useToast } from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import { FaTwitter, FaFacebook, FaWhatsapp, FaTelegram, FaShare } from "react-icons/fa";
import { TwitterShareButton, FacebookShareButton, TelegramShareButton, WhatsappShareButton } from "react-share";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
    name: string | null | undefined;
}

export function Share({ name }: Props) {
    const [isWebShareAPIAvailable, setIsWebShareAPIAvailable] = useState(false);
    const [pathname, setPathname] = useState("");

    useEffect(() => {
        // Determine if Web Share API is available
        // @ts-ignore
        setIsWebShareAPIAvailable(navigator.share ? true : false);

        // Set pathname on mount
        setPathname(window.location.href);
    }, []);

    const shareProps = {
        url: pathname,
        title: "isThisPersonToxic Report",
        text: name ? `Toxicity report for a comment wrote by ${name}` : "Read Toxicity report",
        via: "isThisPersonToxic",
        hashtags: ["toxicity", "isThisPersonToxic", "AI"],
    };

    // Intialize Chakra toast
    const toast = useToast();

    function copyLinkToClipboard() {
        navigator.clipboard.writeText(pathname);
        toast({
            title: "Copied to clipboard!",
            id: "idSuccess",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    }

    function webShare() {
        navigator.share({
            title: shareProps.title,
            text: shareProps.text,
            url: shareProps.url,
        });
    }

    // Animation

    const basicVariants: Variants = {
        offscreen: {
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        onscreen: {
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <Box as="section" py="12" bg={mode("gray.50", "inherit")}>
            <Box
                maxW={{ base: "xl", md: "7xl" }}
                mx="auto"
                px={{ md: "8" }}
                as={motion.div}
                variants={basicVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ amount: "some" }}
            >
                <Box
                    maxW="4xl"
                    mx="auto"
                    py="6"
                    px="8"
                    rounded={{ md: "lg" }}
                    bg={mode("white", "gray.700")}
                    shadow="base"
                >
                    <Box mb="5">
                        <Text as="h3" fontWeight="bold" fontSize="lg">
                            Share report with friends
                        </Text>
                        <Text fontSize="sm" mt="1" color={mode("gray.600", "gray.200")}>
                            Send your report to anyone you want
                        </Text>
                    </Box>

                    <Stack direction={{ base: "column", md: "row" }} mb="4">
                        {isWebShareAPIAvailable ? (
                            <Button
                                variant="outline"
                                flex={{ md: "1" }}
                                leftIcon={<Box as={FaShare} color={mode("blue.500", "blue.200")} />}
                                onClick={webShare}
                            >
                                Share
                            </Button>
                        ) : (
                            <>
                                {" "}
                                <Box
                                    as={TwitterShareButton}
                                    flex={{ md: "1" }}
                                    url={shareProps.url}
                                    title={shareProps.title}
                                    hashtags={shareProps.hashtags}
                                >
                                    <Button
                                        as="div"
                                        w="100%"
                                        variant="outline"
                                        leftIcon={<Box as={FaTwitter} color={mode("blue.500", "blue.200")} />}
                                    >
                                        Twitter
                                    </Button>
                                </Box>
                                <Box
                                    as={FacebookShareButton}
                                    flex={{ md: "1" }}
                                    url={shareProps.url}
                                    title={shareProps.title}
                                    quote={shareProps.text}
                                    hashtag={shareProps.hashtags[0]}
                                >
                                    <Button
                                        as="div"
                                        w="100%"
                                        variant="outline"
                                        leftIcon={<Box as={FaFacebook} color={mode("blue.500", "blue.200")} />}
                                    >
                                        Facebook
                                    </Button>
                                </Box>
                                <Box
                                    as={WhatsappShareButton}
                                    flex={{ md: "1" }}
                                    url={shareProps.url}
                                    title={shareProps.title}
                                >
                                    <Button
                                        as="div"
                                        w="100%"
                                        variant="outline"
                                        leftIcon={<Box as={FaWhatsapp} color={mode("blue.500", "blue.200")} />}
                                    >
                                        WhatsApp
                                    </Button>
                                </Box>
                                <Box
                                    as={TelegramShareButton}
                                    flex={{ md: "1" }}
                                    url={shareProps.url}
                                    title={shareProps.title}
                                >
                                    <Button
                                        as="div"
                                        w="100%"
                                        variant="outline"
                                        leftIcon={<Box as={FaTelegram} color={mode("blue.500", "blue.200")} />}
                                    >
                                        Telegram
                                    </Button>
                                </Box>
                                <Box flex={{ md: "1" }}>
                                    <Button
                                        w="100%"
                                        variant="outline"
                                        leftIcon={<Box as={LinkIcon} color={mode("blue.500", "blue.200")} />}
                                        onClick={copyLinkToClipboard}
                                    >
                                        Copy Link
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}
