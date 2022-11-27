import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import logo from "../../Assets/logo.png";

const Footer = () => {
  return (
    <>
      <Divider />
      <Box px={10}>
        <Stack
          spacing="8"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          py={{ base: "12", md: "16" }}
        >
          <Stack spacing={{ base: "6", md: "8" }} align="start">
            <Text
              display={"flex"}
              alignItems={"center"}
              fontSize={"xl"}
              fontWeight={"bold"}
              color={"green.600"}
            >
              Furniture
              <Box
                h={8}
                w={8}
                style={{ filter: "contrast(80%)" }}
                display={"inline-block"}
                mx={1}
              >
                <Image src={logo} h={"full"} w={"full"}></Image>
              </Box>
              Shala
            </Text>
            <Text color="muted">All rights resvered Furniture Shala</Text>
          </Stack>
          <Stack
            direction={{ base: "column-reverse", md: "column", lg: "row" }}
            spacing={{ base: "12", md: "8" }}
          >
            <Stack direction="row" spacing="8">
              <Stack spacing="4" minW="36" flex="1">
                <Text fontSize="sm" fontWeight="semibold" color="subtle">
                  Product
                </Text>
                <Stack spacing="3" shouldWrapChildren>
                  <Button variant="link">How it works</Button>
                  <Button variant="link">Pricing</Button>
                  <Button variant="link">Use Cases</Button>
                </Stack>
              </Stack>
              <Stack spacing="4" minW="36" flex="1">
                <Text fontSize="sm" fontWeight="semibold" color="subtle">
                  Legal
                </Text>
                <Stack spacing="3" shouldWrapChildren>
                  <Button variant="link">Privacy</Button>
                  <Button variant="link">Terms</Button>
                  <Button variant="link">License</Button>
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing="4">
              <Text fontSize="sm" fontWeight="semibold" color="subtle">
                Stay up to date
              </Text>
              <Stack
                spacing="4"
                direction={{ base: "column", sm: "row" }}
                maxW={{ lg: "360px" }}
              >
                <Input placeholder="Enter your email" type="email" required />
                <Button
                  variant="primary"
                  bg={"green.600"}
                  type="submit"
                  flexShrink={0}
                >
                  Subscribe
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Footer;
