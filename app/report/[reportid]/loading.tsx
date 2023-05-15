"use client";

import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Flex w="100vw" h="100vh" align="center" justify="center" position="absolute">
            <Spinner size="xl" color="green.500" />
        </Flex>
    );
}
