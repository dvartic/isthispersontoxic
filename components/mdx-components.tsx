"use client";
import { Heading, Text, ListItem, UnorderedList, OrderedList, Image, Code, Link } from "@chakra-ui/react";

// Sets styles and assigns Chakra components to the next-mdx-remote HTML generator.
const styles = {
    h1: (props: any) => <Heading as="h1" mt={14} mb={4} size="2xl" {...props} />,
    h2: (props: any) => <Heading as="h2" {...props} mt={14} mb={4} size="lg" />,
    h3: (props: any) => <Heading as="h3" {...props} mt={14} mb={4} size="md" />,
    p: (props: any) => <Text {...props} mt={4} mb={4} />,
    ul: (props: any) => <UnorderedList {...props} mt={4} mb={4} />,
    ol: (props: any) => <OrderedList {...props} mt={4} mb={4} />,
    li: (props: any) => <ListItem {...props} mt={2} mb={2} />,
    pre: (props: any) => <pre display="block" w="100%" mt={8} mb={8} padding={2} {...props} />,
    code: (props: any) => <Code {...props} borderRadius={5} />,
    a: (props: any) => <Link {...props} isExternal color="teal.500" />,
    img: (props: any) => <Image {...props} alt="" maxH={96} objectFit="contain" ml="auto" mr="auto" mt={8} mb={8} />,
};

export default styles;
