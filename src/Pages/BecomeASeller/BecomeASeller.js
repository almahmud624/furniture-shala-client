import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FcAssistant } from "react-icons/fc";

const BecomeASeller = () => {
  return (
    <>
      <Box py={20} maxWidth={"90%"} margin={"auto"}>
        <Flex justify={"center"} align={"center"}>
          <Box flex={"1"}>
            <Heading>Become seller on furniture shala</Heading>
            <Text as={"p"} mt={4} color={"gray.400"}>
              lSed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium,On the other hand, we denounce
              with righteous indignation and dislike men who are so beguiled and
              demoralized by the charms of pleasure of the moment, so blinded by
              desire, that they cannot foresee the pain and trouble that are
              bound to ensue; and equal blame belongs to those who fail in their
              duty through weakness of will
            </Text>
          </Box>
          <Flex flex={"1"} justify={"right"}>
            <Box
              width={"80%"}
              border={"1px solid #2D3748"}
              borderRadius="64% 36% 53% 47% / 50% 33% 67% 50% "
              boxShadow={"0px 0px 14px 0px rgba(0,0,0,0.45) "}
              p={2}
            >
              <Image
                h={"full"}
                w={"full"}
                rounded="md"
                borderRadius="64% 36% 53% 47% / 50% 33% 67% 50% "
                src="https://img.freepik.com/free-photo/salesman-shows-color-swatches-lady-customer-new-kitchen-furniture_93675-134887.jpg?w=740&t=st=1686321235~exp=1686321835~hmac=9e0653e1b75f7485dc899ec8cf4a465c9d7494638c8de249c6c14ab6d7a6fa0b"
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

const data = [
  {
    title: "Lower cost",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    icon: FcAssistant,
  },
  {
    title: "Lower cost",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    icon: FcAssistant,
  },
  {
    title: "Lower cost",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    icon: FcAssistant,
  },
  {
    title: "Lower cost",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    icon: FcAssistant,
  },
];

const WhySell = () => {
  return (
    <>
      <Box mt={12}>
        <Heading>Why sell on furniture shala ?</Heading>
        <Flex gridGap={6} justify="space-between" mt={10}>
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

const Card = ({ heading, description, icon, href }) => {
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
