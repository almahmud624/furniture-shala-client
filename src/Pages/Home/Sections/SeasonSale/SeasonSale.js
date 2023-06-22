import { Box, Heading, Icon, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import CustomGradientBtn from "../../../../Component/CustomGradientBtn";
import bg from "../../../../Assets/season-sale-bg.jpg";
import { MdOutlineCelebration } from "react-icons/md";
import Animate from "../../../../Component/Animate";
import getCurrentSeason from "../../../../Utilities/getCurrentSeason";

const SeasonSale = () => {
  return (
    <>
      <Box my={20} pos={"relative"}>
        <Box h={{ base: "full", md: "430px" }} w={"full"}>
          <Image src={bg} objectFit={"cover"} w={"full"} h={"full"} />
        </Box>
        <Box
          w={"full"}
          h={"full"}
          bg={"gray.900"}
          pos={"absolute"}
          top={0}
          left={0}
          opacity={0.7}
        ></Box>
        <VStack
          position={"absolute"}
          top={"0"}
          left={0}
          w={"full"}
          h={"full"}
          justify={"center"}
        >
          <Text fontWeight={"semibold"} color="gray.400">
            Extra{" "}
            <Text
              display={"inline-block"}
              fontSize={"xl"}
              fontFamily={"fantasy"}
              fontWeight={"normal"}
              color={"red.500"}
            >
              <Animate
                animate={{
                  translateY: [-3, 3, 3, -3, -3],
                }}
              >
                <Icon as={MdOutlineCelebration} color={"red.500"} mr={1} />
              </Animate>
              25% off{" "}
              <Animate
                animate={{
                  translateY: [3, -3, -3, 3, 3],
                }}
              >
                <Icon as={MdOutlineCelebration} color={"red.500"} />
              </Animate>
            </Text>{" "}
            online
          </Text>

          <Heading
            mb={4}
            fontSize={{
              base: "2xl",
              md: "5xl",
            }}
            fontWeight="bold"
            textAlign={"left"}
            lineHeight={{
              md: "shorter",
            }}
            color={"gray.200"}
          >
            {getCurrentSeason()} Season Sale
          </Heading>
          <Text pb={2} color="gray.400">
            Free shipping on orders over $99
          </Text>
          <CustomGradientBtn link={"/shop"} size={{ base: "sm", md: "md" }}>
            Shop Now
          </CustomGradientBtn>
        </VStack>
      </Box>
    </>
  );
};

export default SeasonSale;
