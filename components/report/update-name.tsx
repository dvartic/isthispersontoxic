import { AddIcon } from "@chakra-ui/icons";
import { Button, HStack, Input, InputGroup, InputLeftElement, useMediaQuery, useToast } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
    setHasNameBeenAdded: Dispatch<SetStateAction<boolean>>;
    slug: string;
}

export function UpdateNameInput({ setHasNameBeenAdded, slug }: Props) {
    const [nameInput, setNameInput] = useState("");

    // Intialize Chakra toast
    const toast = useToast();

    async function updateName() {
        // Check that field is not empty
        if (nameInput === "") return;

        // Update to your API
        const res = await fetch("/api/update-name", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameInput,
                slug: slug,
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
            setHasNameBeenAdded(true);
            toast({
                title: "Name Updated!",
                id: "idSuccess",
                description: "Name has been updated",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        }
    }

    // Input group size media query
    const [isSmallerThan480] = useMediaQuery("(max-width: 480px)");

    return (
        <HStack>
            <InputGroup size={isSmallerThan480 ? "sm" : "md"}>
                <InputLeftElement pointerEvents="none">
                    <AddIcon />
                </InputLeftElement>
                <Input placeholder="Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
            </InputGroup>
            <Button colorScheme="green" onClick={updateName} size={isSmallerThan480 ? "sm" : "md"}>
                Add
            </Button>
        </HStack>
    );
}
