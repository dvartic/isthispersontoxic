import { Box, BoxProps, Circle, Heading, HStack, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { useStep } from "./use-step";
import { motion, Variants } from "framer-motion";

interface StepProps extends BoxProps {
    title?: string;
    setActiveStep: (step: number) => void;
}

export function Step(props: StepProps) {
    const { title, setActiveStep, children, ...boxProps } = props;
    const { isActive, step } = useStep();

    const accentColor = useColorModeValue("#38A169", "#68D391");
    const hoverColorAct = useColorModeValue("green.600", "green.200");
    const hoverColorInact = useColorModeValue("gray.50", "gray.900");
    const mutedColor = useColorModeValue("gray.600", "whiteAlpha.800");
    const activeColor = useColorModeValue("#FFFFFF", "#000000");

    const [isHoverNotSupported] = useMediaQuery("(hover: none)");
    const hoverButton = () =>
        isHoverNotSupported ? {} : { backgroundColor: isActive ? hoverColorAct : hoverColorInact };

    // Color transition animations
    const colorVariants: Variants = {
        active: {
            backgroundColor: accentColor,
            transition: {
                duration: 0.5,
            },
        },
        inactive: {
            backgroundColor: activeColor,
            transition: {
                duration: 0.5,
            },
        },
    };

    const scrollAnimVariants: Variants = {
        offscreen: {
            x: -30,
            opacity: 0,
            transition: {
                duration: 1,
            },
        },
        onscreen: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 1,
            },
        },
    };

    return (
        <Box
            as={motion.div}
            variants={scrollAnimVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: "all" }}
            {...boxProps}
        >
            <HStack spacing="4">
                <Circle
                    onClick={() => setActiveStep(step - 1)}
                    _hover={hoverButton()}
                    size="8"
                    fontWeight="bold"
                    color={isActive ? activeColor : mutedColor}
                    as={motion.button}
                    variants={colorVariants}
                    initial="inactive"
                    animate={isActive ? "active" : "inactive"}
                    borderColor="inherit"
                    borderWidth={isActive ? "0px" : "1px"}
                >
                    {step}
                </Circle>
                <Heading as="h3" fontSize="2xl" fontWeight="semibold" color={isActive ? "inherit" : mutedColor}>
                    {title}
                </Heading>
            </HStack>
            {children}
        </Box>
    );
}
