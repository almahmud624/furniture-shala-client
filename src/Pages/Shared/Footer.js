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
import logo from "../../Assets/logo.png";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const SocialButton = ({ children }) => {
    return (
      <>
        <Link
          label={"Twitter"}
          href={"#"}
          borderColor="gray.500"
          borderWidth={1}
          p={2}
          borderRadius={5}
          _hover={{ bg: "green.700", borderColor: "green.500" }}
        >
          {children}
        </Link>
      </>
    );
  };
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
          <Stack spacing={{ base: "2", md: "3" }} align="start">
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
            <Text
              fontSize="18"
              color={"gray.600"}
              _dark={{ color: "green.100" }}
            >
              Furniture that speaks to your unique style
            </Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton>
                <FaTwitter />
              </SocialButton>
              <SocialButton>
                <FaYoutube />
              </SocialButton>
              <SocialButton>
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
