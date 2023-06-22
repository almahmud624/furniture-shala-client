import React, { useState } from "react";
import {
  Flex,
  Text,
  Heading,
  Button,
  Box,
  FormControl,
  useColorModeValue,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";
import messageImg from "../../Assets/newsletter.png";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("initial");
  return (
    <div>
      <Flex
        direction={["column-reverse", "column-reverse", "row"]}
        align="center"
        justifyContent="space-between"
        mb={16}
        px={{ sm: 0, md: 16 }}
        py={{ base: 10, md: 0 }}
        bg={useColorModeValue("gray.300", "#1E2532")}
        borderRadius={5}
      >
        <Box>
          <Heading as="h3" size="lg">
            Subscribe to our newsletter
          </Heading>
          <Text
            mt={2}
            mb={6}
            fontWeight="medium"
            fontSize="18"
            color="green.500"
          >
            Get $15 discount for your first order
          </Text>
          <Stack
            direction={{ base: "column", md: "row" }}
            as={"form"}
            spacing={"12px"}
            onSubmit={(e) => {
              e.preventDefault();

              setState("submitting");

              setTimeout(() => {
                if (email === "fail@example.com") {
                  setState("initial");
                  return;
                }

                setState("success");
              }, 1000);
            }}
          >
            <FormControl>
              <Input
                variant={"solid"}
                borderWidth={1}
                color={"gray.400"}
                bg="transparent"
                _placeholder={{
                  color: "gray.400",
                }}
                borderColor={useColorModeValue("gray.400", "gray.500")}
                id={"email"}
                type={"email"}
                required
                placeholder={"Your Email"}
                aria-label={"Your Email"}
                value={email}
                disabled={state !== "initial"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl w={{ base: "100%", md: "40%" }}>
              <Button
                bg={"primary"}
                _hover={{ bg: "secondary" }}
                transition={"all .3s"}
                isLoading={state === "submitting"}
                w="100%"
                type={state === "success" ? "button" : "submit"}
              >
                {state === "success" ? <CheckIcon /> : "Submit"}
              </Button>
            </FormControl>
          </Stack>
        </Box>
        <Box w={300}>
          <Image w="full" src={messageImg}></Image>
        </Box>
      </Flex>
    </div>
  );
};

export default Newsletter;
