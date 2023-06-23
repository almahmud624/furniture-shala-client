import {
  Flex,
  Heading,
  Stack,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import faqBg from "../../Assets/faq-bg.jpg";
import aboutBg from "../../Assets/about-us-bg.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PageHeader from "../../Component/PageHeader/PageHeader";
import useDynamicTitle from "../../Hooks/useDynamicTitle";

const data = [
  {
    question: "Who are we and what is our mission?",
    answer:
      "We are a dedicated team of passionate individuals who believe in the power of reuse and sustainable consumption.",
  },
  {
    question: "Why should you choose our resale website?",
    answer:
      "We offer a user-friendly and secure platform for buying and selling pre-owned items. Our website provides a wide range of categories to cater to diverse interests and needs. We prioritize user safety and security, implementing measures to protect against fraudulent activity and ensuring smooth transactions.",
  },
  {
    question: "How can you get involved and contribute?",
    answer:
      "You can start by joining our community and creating an account on our website. If you have pre-owned items you'd like to sell, simply list them on our platform following our easy-to-use listing process. If you're looking to purchase items, browse through our diverse selection and connect with sellers directly to negotiate and complete transactions.",
  },
];

export default function AboutUs() {
  useDynamicTitle("About Us");
  return (
    <Box maxW={"90%"} mx="auto">
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 5, md: 5 }}
        pt={10}
        w={"full"}
      >
        <PageHeader
          pageTag={"Our Story"}
          title={"Connecting People and Possibilities"}
        >
          Introducing Furniture Shala, the ultimate destination for all your
          furniture needs. Browse our vast selection of high-quality, pre-owned
          furniture pieces that are both stylish and affordable. Whether you're
          looking for a modern sofa, a vintage dining table, or a cozy armchair,
          Furniture Shala has it all. Our platform connects buyers and sellers,
          creating a vibrant community centered around sustainable consumption.
          Experience the joy of finding hidden gems and giving pre-loved
          furniture a new lease on life. With our secure payment options and
          reliable shipping services, buying and selling furniture has never
          been easier. Join our community of furniture enthusiasts and discover
          the endless possibilities of creating a beautiful, unique space. Visit
          Furniture Shala today and unlock the potential of sustainable, stylish
          living. Transform your home while making a positive impact on the
          environment. Welcome to Furniture Shala, where furniture dreams come
          true.
        </PageHeader>

        <Flex w={"full"} justify={"center"} pt={5}>
          <Box
            w={"full"}
            border={"1px solid #2D3748"}
            rounded="md"
            boxShadow={"0px 0px 14px 0px rgba(0,0,0,0.45) "}
            h={"418px"}
            p={2}
          >
            <LazyLoadImage
              width="100%"
              height={"250px"}
              effect="blur"
              style={{
                borderRadius: "7px",
                objectFit: "cover",
                height: "400px",
              }}
              src={aboutBg}
            />
          </Box>
        </Flex>
      </Stack>
      <CustomerService />
    </Box>
  );
}

function CustomerService() {
  return (
    <Box>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 20, md: 28 }}
        pb={{ base: 10, md: 16 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 5 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "4xl" }}
          >
            Find Answers to Common Queries about Our Resale Website
          </Heading>

          <Accordion allowToggle>
            {data?.map(({ question, answer }) => (
              <AccordionItem
                key={question}
                borderWidth={0}
                _last={{ borderBottomWidth: 0 }}
                mb={3}
              >
                <h2>
                  <AccordionButton borderWidth={1} rounded={"md"}>
                    <Box as="span" flex="1" textAlign="left">
                      {question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  pb={4}
                  bg={"gray.900"}
                  color={"gray.300"}
                  roundedBottom={"md"}
                >
                  {answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Stack>
        <Box
          height={{ base: "full", md: "300px" }}
          rounded={"xl"}
          boxShadow={"2xl"}
          width={{ base: "full", md: "50%" }}
          overflow={"hidden"}
          flex={1}
        >
          <LazyLoadImage
            alt={"Faq Image"}
            objectFit={"cover"}
            width={"100%"}
            height={"100%"}
            effect="blur"
            src={faqBg}
          />
        </Box>
      </Stack>
    </Box>
  );
}
