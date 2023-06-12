import {
  Box,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import {
  FcPodiumWithAudience,
  FcMoneyTransfer,
  FcBullish,
  FcProcess,
} from "react-icons/fc";
import PageHeader from "../../Component/PageHeader/PageHeader";
import sellerImg from "../../Assets/seller.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
const data = [
  {
    title: "Maximize Your Earnings",
    description:
      "Sell your pre-owned furniture on Furniture Shala and unlock the potential to earn top dollar for your items. Our platform connects you with a wide audience of buyers who appreciate the value of quality furniture.",
    icon: FcMoneyTransfer,
  },
  {
    title: "Hassle-Free Selling",
    description:
      "Listing your furniture on Furniture Shala is quick and easy. Our user-friendly interface allows you to create attractive listings in minutes, showcasing your items to potential buyers and streamlining the selling process.",
    icon: FcBullish,
  },
  {
    title: "Reach a Targeted Audience",
    description:
      "By selling on Furniture Shala, you gain access to a community of furniture enthusiasts actively seeking unique pieces for their homes. Your listings will be seen by motivated buyers who appreciate the beauty of pre-owned furniture.",
    icon: FcPodiumWithAudience,
  },
  {
    title: "Sustainable Choice",
    description:
      "Join us in promoting sustainable consumption. By selling your furniture on Furniture Shala, you contribute to reducing waste and extending the lifecycle of quality pieces. Help create a greener future by finding new homes for your beloved furniture.",
    icon: FcProcess,
  },
];

const BecomeASeller = () => {
  return (
    <>
      <Box py={20} maxWidth={"90%"} margin={"auto"}>
        <Flex justify={"center"} align={"center"}>
          <Box flex={"1"}>
            <PageHeader
              pageTag={"Become Seller"}
              title={"Become seller on furniture shala"}
              tagStyle={{ align: "left", w: "fit-content" }}
            >
              Join Furniture Shala's Community of Sellers and Tap into the
              Thriving Market of Pre-Owned Furniture. List Your Items, Connect
              with Buyers, and Maximize Your Earnings. With Secure Transactions
              and a Sustainable Approach, Furniture Shala Provides the Platform
              for Selling Success. Whether you're an experienced seller or new
              to the game, start your journey today and unlock the potential of
              turning your pre-owned furniture into profit.
            </PageHeader>
          </Box>
          <Flex flex={"1"} justify={"right"}>
            <Box
              width={"80%"}
              border={"1px solid #2D3748"}
              rounded={"md"}
              boxShadow={"0px 0px 14px 0px rgba(0,0,0,0.45) "}
              p={2}
            >
              <LazyLoadImage
                h={"full"}
                w={"full"}
                src={sellerImg}
                style={{
                  borderRadius: "7px",
                  objectFit: "cover",
                  width: "full",
                  height: "full",
                }}
                effect="blur"
              />
            </Box>
          </Flex>
        </Flex>
        <WhySell />
      </Box>
    </>
  );
};

export default BecomeASeller;

const WhySell = () => {
  return (
    <>
      <Box mt={12}>
        <Heading>Why sell on furniture shala ?</Heading>
        <Flex
          gridGap={6}
          justify={{ md: "center", lg: "space-between" }}
          mt={10}
          flexWrap={"wrap"}
        >
          {data?.map(({ title, description, icon }) => (
            <Card
              key={title}
              heading={title}
              icon={<Icon as={icon} w={10} h={10} />}
              description={description}
            />
          ))}
        </Flex>
      </Box>
    </>
  );
};

const Card = ({ heading, description, icon }) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="sm"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md" fontWeight={"semibold"}>
            {heading}
          </Heading>
          <Text mt={1} fontSize={"sm"} color={"gray.400"}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};
