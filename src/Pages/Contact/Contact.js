import {
  Flex,
  Box,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { MdOutlineEmail, MdPhone } from "react-icons/md";
import PageHeader from "../../Component/PageHeader/PageHeader";
import contactImg from "../../Assets/contact-img.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Contact() {
  return (
    <Box bg="gray.800" maxW="full" mt={0} overflow="hidden">
      <Flex justify="center">
        <Flex
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 14 }}
          gap={10}
        >
          <Box w={"50%"}>
            <PageHeader
              title={"Let's talk about everything"}
              headerStyle={{ fontSize: "4xl" }}
            ></PageHeader>
            <Box
              mt={10}
              border={"1px solid #2D3748"}
              rounded="md"
              boxShadow={"0px 0px 14px 0px rgba(0,0,0,0.45) "}
              p={2}
            >
              <LazyLoadImage
                src={contactImg}
                effect="blur"
                style={{
                  width: "100%",
                  borderRadius: "7px",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>

          <Box flex={1}>
            <Box mx={8} color="#0B0E3F">
              <PageHeader
                title={"We would love to hear from you."}
                headerStyle={{ fontSize: "4xl", color: "gray.200" }}
              ></PageHeader>
              <VStack spacing={5} color="gray.200">
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <InputGroup borderColor="#E0E1E7">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<MdPhone color="gray.800" />}
                    />
                    <Input type="text" size="md" />
                  </InputGroup>
                </FormControl>
                <FormControl id="emain">
                  <FormLabel>Mail</FormLabel>
                  <InputGroup borderColor="#E0E1E7">
                    <InputLeftElement
                      pointerEvents="none"
                      children={<MdOutlineEmail color="gray.800" />}
                    />
                    <Input type="text" size="md" />
                  </InputGroup>
                </FormControl>
                <FormControl id="message">
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    borderColor="gray.300"
                    _hover={{
                      borderRadius: "gray.300",
                    }}
                    placeholder="message"
                  />
                </FormControl>
                <FormControl id="name" float="right">
                  <Button
                    variant="solid"
                    bg="#0D74FF"
                    color="white"
                    _hover={{}}
                  >
                    Send Message
                  </Button>
                </FormControl>
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
