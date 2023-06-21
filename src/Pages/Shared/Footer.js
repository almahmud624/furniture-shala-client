import React from "react";
import {
  Box,
  Button,
  Divider,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import logo2 from "../../Assets/logo2.png";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const SocialButton = ({ children, link }) => {
    return (
      <>
        <Link
          label={"social"}
          href={link}
          borderColor="gray.500"
          borderWidth={1}
          p={2}
          borderRadius={5}
          target="_blank"
          _hover={{ bg: "primary", borderColor: "secondary" }}
        >
          {children}
        </Link>
      </>
    );
  };
  return (
    <>
      <Divider />
      <Box maxW={"90%"} mx={"auto"}>
        <Stack
          spacing="8"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          py={{ base: "12", md: "16" }}
        >
          <Stack spacing={{ base: "2", md: "4" }} align="start">
            <Box h={"full"} w={40} display={"inline-block"}>
              <Image
                src={logo2}
                h={"full"}
                w={"full"}
                objectFit={"contain"}
              ></Image>
            </Box>
            <Text
              fontSize="18"
              color={"gray.600"}
              _dark={{ color: "gray.300" }}
            >
              Furniture that speaks to your unique style
            </Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton link={"https://twitter.com/"}>
                <FaTwitter />
              </SocialButton>
              <SocialButton link={"https://www.youtube.com/"}>
                <FaYoutube />
              </SocialButton>
              <SocialButton link={"https://www.instagram.com/"}>
                <FaInstagram />
              </SocialButton>
            </Stack>
            <Text color="muted">
              All rights resvered Furniture Shala © 2023
            </Text>
          </Stack>
          <Stack
            direction={{ base: "column-reverse", md: "column", lg: "row" }}
            spacing={{ base: "12", md: "8" }}
          >
            <Stack direction="row" spacing="8">
              <Stack spacing="4" minW="36" flex="1">
                <Text fontSize="lg" fontWeight="semibold" color="subtle">
                  Product
                </Text>
                <Stack spacing="3" shouldWrapChildren>
                  <Button variant="link" fontWeight="normal">
                    How it works
                  </Button>
                  <Button variant="link" fontWeight="normal">
                    Pricing
                  </Button>
                  <Button variant="link" fontWeight="normal">
                    Use Cases
                  </Button>
                </Stack>
              </Stack>
              <Stack spacing="4" minW="36" flex="1">
                <Text fontSize="lg" fontWeight="semibold" color="subtle">
                  Legal
                </Text>
                <Stack spacing="3" shouldWrapChildren>
                  <Button variant="link" fontWeight="normal">
                    Privacy
                  </Button>
                  <Button variant="link" fontWeight="normal">
                    Terms
                  </Button>
                  <Button variant="link" fontWeight="normal">
                    License
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing="4">
              <Stack spacing="4" minW="36" flex="1">
                <Text fontSize="lg" fontWeight="semibold" color="subtle">
                  Store Information
                </Text>
                <Stack spacing="3" shouldWrapChildren>
                  <Text>Globe Furniture Shala</Text>{" "}
                  <Text>C/54 Northwest Freeway, Suite 558</Text>
                  <Text>+01234456634</Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Footer;
