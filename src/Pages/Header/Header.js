import React from "react";
import {
  chakra,
  Container,
  Stack,
  HStack,
  Text,
  Image,
  Box,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import CustomGradientBtn from "../../Component/CustomGradientBtn";
import sofa1 from "../../Assets/sofa1.png";
import sofa2 from "../../Assets/sofa2.png";
import chair1 from "../../Assets/chair1.jpg";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  fade: true,
  pauseOnHover: false,
};

const textContents = [
  {
    hightlightTitle1: "Resale your furniture",
    title: "with",
    hightlightTitle2: "Best Price",
    subtitle:
      "From today resale your furniture and buy best quality of furnitures with extra Special offer!!",
    btnText: "Join as a Seller",
    btnLink: "/login?role=seller",
  },
  {
    hightlightTitle1: "Discover a World",
    title: "of",
    hightlightTitle2: "Resale Treasures",
    subtitle: "Shop unique pre-loved items at unbeatable prices",
    btnText: "Shop Now",
    btnLink: "/shop",
  },
  {
    hightlightTitle1: "Sell Your Unwanted Items",
    title: "with",
    hightlightTitle2: "Ease",
    subtitle: "Turn clutter into cash with our hassle-free selling platform",
    btnText: "Join as a Seller",
    btnLink: "/login?role=seller",
  },
];

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box px={{ base: 2, md: 3, "2xl": 0 }} mt={[5, 10, 16]} mx={"auto"}>
        <Stack
          direction={{
            base: "column-reverse",
            md: "column-reverse",
            lg: "row",
          }}
          justifyContent={{ lg: "center", "2xl": "space-between" }}
          align={"center"}
          spacing={{ base: 14, md: 36 }}
        >
          <Stack
            justifyContent="center"
            w={{ base: "sm", md: "2xl", lg: "2xl", "2xl": "3xl" }}
            boxSizing="border-box"
          >
            <Slider {...settings}>
              {textContents?.map((item) => (
                <React.Fragment key={item}>
                  <VStack alignItems={{ base: "center", md: "flex-start" }}>
                    <chakra.h1
                      fontSize={["2xl", "3xl", "5xl"]}
                      lineHeight={1.3}
                      fontWeight="bold"
                      textAlign={{ base: "center", md: "left" }}
                    >
                      <chakra.span color="primary">
                        {item?.hightlightTitle1}{" "}
                      </chakra.span>
                      {item?.title}{" "}
                      <chakra.span color="primary">
                        {item.hightlightTitle2}
                      </chakra.span>
                    </chakra.h1>
                    <Text
                      fontSize={["1em", "1em", "1.1em"]}
                      textAlign={{ base: "center", md: "left" }}
                      lineHeight="1.375"
                      fontWeight="400"
                      color="gray.500"
                      py={{ base: 3, md: 4 }}
                    >
                      {item?.subtitle}
                    </Text>
                    <HStack
                      spacing={{ base: 0, sm: 2 }}
                      mb={{ base: "3rem !important", sm: 0 }}
                      flexWrap="wrap"
                    >
                      <CustomGradientBtn
                        action={() => navigate(item?.btnLink)}
                        link={item?.btnLink}
                        customStyle={{ zIndex: "40" }}
                      >
                        {item?.btnText}
                      </CustomGradientBtn>
                    </HStack>
                  </VStack>
                </React.Fragment>
              ))}
            </Slider>
          </Stack>
          <Box ml={{ base: 0, md: 5 }} pos="relative">
            <Box
              height={{
                base: "250px",
                md: "350px",
                lg: "450px",
                "2xl": "550px",
              }}
              width={{
                base: "250px",
                md: "350px",
                lg: "450px",
                "2xl": "550px",
              }}
              display={"block"}
            >
              <Slider {...settings}>
                {[sofa1, sofa2, chair1]?.map((item) => (
                  <React.Fragment key={item}>
                    <Box
                      p={2}
                      borderRadius="64% 36% 53% 47% / 50% 33% 67% 50% "
                      borderWidth={2}
                      borderColor={"secondary"}
                    >
                      <Image
                        w="100%"
                        height={{
                          base: "250px",
                          md: "350px",
                          lg: "450px",
                          "2xl": "550px",
                        }}
                        objectFit="cover"
                        src={item}
                        rounded="md"
                        borderRadius="64% 36% 53% 47% / 50% 33% 67% 50% "
                        boxShadow={"0px 0px 14px 0px rgba(0,0,0,0.45) "}
                        fallback={<Skeleton />}
                        loading="lazy"
                      />
                    </Box>
                  </React.Fragment>
                ))}
              </Slider>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Header;
