import React, { useState, useContext } from "react";
import {
  Box,
  Container,
  Heading,
  IconButton,
  Stack,
  useBreakpointValue,
  Button,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import "./AdvertismentCarousel.css";
import OrderForm from "../../../Component/OrderForm";
import FormModal from "../../../Component/FormModal";
import { AuthContext } from "../../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import brokenImg from "../../../Assets/image-not-found.jpg";

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
  const navigate = useNavigate();
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
        borderRadius={5}
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
          bg="primary"
          _dark={{
            bg: "primary",
          }}
          _hover={{
            bg: "green.800",
            _dark: {
              bg: "primary",
            },
          }}
          color={"#ccc"}
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
          bg="primary"
          _dark={{
            bg: "primary",
          }}
          _hover={{
            bg: "green.800",
            _dark: {
              bg: "primary",
            },
          }}
          color={"#ccc"}
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
                <Box
                  w={"sm"}
                  maxW={"md"}
                  position="absolute"
                  top="50%"
                  left={"50%"}
                  transform="translate(-50%, -50%)"
                  color={"gray.800"}
                  _hover={{ opacity: 1 }}
                  transition={"all .3s"}
                >
                  <Box
                    backdropFilter="blur(3px)"
                    backgroundImage="linear-gradient(to top, #dfe6e9 0%, gray 100%)"
                    opacity={0.8}
                    borderTopRadius={5}
                    py={3}
                  >
                    <Heading
                      fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                      textAlign={"center"}
                      pt={2}
                      mt={2}
                    >
                      {card?.productName}
                    </Heading>
                    <Text
                      textAlign={"center"}
                      fontSize={{ base: "inherit", md: "xl" }}
                      fontWeight={"semibold"}
                      color={"gray.700"}
                    >
                      ${card?.newPrice}
                    </Text>
                  </Box>
                  <Button
                    w={"full"}
                    fontSize={{ base: "md", lg: "lg" }}
                    color="gray.800"
                    bg="primary"
                    _dark={{
                      backgroundImage:
                        "linear-gradient(to bottom, #dfe6e9 0%, #2C74B3 100%)",
                    }}
                    transition={"all 0.3s"}
                    display={"inline-block"}
                    borderEndRadius={5}
                    borderTopRadius={0}
                    onClick={() => {
                      setProductInfo(card);
                      onOpen();
                      !user?.uid && navigate("/login");
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>
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
