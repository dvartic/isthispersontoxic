import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import { useStep } from "./use-step";
import { motion, Variants } from "framer-motion";

export function StepContent(props: BoxProps) {
    const { isLastStep, isCompleted } = useStep();
    const accentColor = useColorModeValue("#38A169", "#68D391");
    const borderColor = useColorModeValue("rgb(226, 232, 240)", "rgba(255, 255, 255, 0.16)");

    // Color transition animations
    const borderColorVariants: Variants = {
        completed: {
            borderColor: accentColor,
            transition: {
                duration: 0.5,
            },
        },
        incomplete: {
            borderColor: borderColor,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <Box
            color={useColorModeValue("gray.600", "gray.400")}
            borderStartWidth={isLastStep ? "1px" : "0"}
            as={motion.div}
            variants={borderColorVariants}
            initial="incomplete"
            animate={isCompleted ? "completed" : "incomplete"}
            ms="4"
            mt="2"
            mb="2"
            ps="8"
            pb="9"
            fontSize="sm"
            {...props}
        />
    );
}
