import React, { useState, useContext } from "react";
import {
  Box,
  Container,
  Heading,
  IconButton,
  Stack,
  useBreakpointValue,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import "./AdvertismentCarousel.css";
import OrderForm from "../../../Component/OrderForm";
import FormModal from "../../../Component/FormModal";
import { AuthContext } from "../../../Context/AuthProvider";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: true,
};
const AdvertismentCarousel = ({ advertiseItems }) => {
  const [slider, setSlider] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);
  const [productInfo, setProductInfo] = useState();
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  return (
    <div>
      <Box
        position={"relative"}
        height={"300px"}
        width={"full"}
        overflow={"hidden"}
        style={{ height: "300px !important" }}
      >
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          colorScheme="messenger"
          borderRadius="full"
          position="absolute"
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          colorScheme="messenger"
          borderRadius="full"
          position="absolute"
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt />
        </IconButton>
        {/* Slider */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {advertiseItems.map((card, index) => (
            <Box
              key={Math.random()}
              height={"full"}
              position="relative"
              backgroundPosition="contain"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${card.productImg})`}
            >
              <Container size="container.lg" height="600px" position="relative">
                <Stack
                  spacing={6}
                  w={"full"}
                  maxW={"lg"}
                  position="absolute"
                  top="50%"
                  transform="translate(0, -50%)"
                  backdropFilter="auto"
                  backdropInvert="80%"
                  backdropBlur="2px"
                  backdropBrightness={"30"}
                  borderRadius={2}
                >
                  <Heading
                    fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                    textAlign={"center"}
                    pt={2}
                  >
                    {card.productName}
                  </Heading>
                  <Button
                    fontSize={{ base: "md", lg: "lg" }}
                    color="GrayText"
                    display={"inline-block"}
                    onClick={() => {
                      setProductInfo(card);
                      onOpen();
                    }}
                  >
                    Buy Now
                  </Button>
                </Stack>
              </Container>
            </Box>
          ))}
        </Slider>
        <FormModal isOpen={isOpen} onClose={onClose} modalTitle={"demo"}>
          <OrderForm user={user} productInfo={productInfo} onClose={onClose} />
        </FormModal>
      </Box>
    </div>
  );
};

export default AdvertismentCarousel;
