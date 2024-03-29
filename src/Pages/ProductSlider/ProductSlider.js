import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import FormModal from "../../Component/FormModal";
import OrderForm from "../../Component/OrderForm";
import { AuthContext } from "../../Context/AuthProvider";
import { DataStoreContext } from "../../Context/DataProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

let settings = {
  dots: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  speed: 1500,
  autoplaySpeed: 4000,
  cssEase: "linear",
  pauseOnHover: true,
  swipeToSlide: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const ProductSlider = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productInfo, setProductInfo] = useState();
  const { products } = useContext(DataStoreContext);

  return (
    <div>
      <Box mt={[0, 0, 32]} mb={[0, 0, "2rem"]}>
        <Slider {...settings}>
          {products?.map((product) => (
            <div key={Math.random()}>
              <Box px={2}>
                <Card
                  maxW="sm"
                  margin={"auto"}
                  bgGradient="linear(to-b, #ffffff, #2D3748)"
                  _dark={{ bgGradient: "linear(to-b, #1A202C, #2D3748)" }}
                >
                  <CardBody>
                    <Box height={"150px"} width={"100%"}>
                      <Image
                        src={product?.productImg}
                        alt="Green double couch with wooden legs"
                        borderRadius="md"
                        w={"100%"}
                        h={"100%"}
                        objectFit={"cover"}
                      />
                    </Box>
                    <Stack mt="6" spacing="3">
                      <Heading
                        size="sm"
                        fontWeight={"normal"}
                        noOfLines={1}
                        color="gray.200"
                        _dark={{ color: "gray.200" }}
                      >
                        {product?.productName}
                      </Heading>
                    </Stack>
                  </CardBody>
                  <Divider bg={"primary"} />
                  <CardFooter
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Button
                      variant="solid"
                      size={"sm"}
                      bg="primary"
                      color={"gray.200"}
                      _dark={{ color: "gray.300" }}
                      borderRadius="sm"
                      _hover={{ bg: "secondary" }}
                      transition={"all .3s"}
                      onClick={() => {
                        setProductInfo(product);
                        onOpen();
                        !user?.uid && navigate("/login");
                      }}
                    >
                      Buy now
                    </Button>
                    <Text
                      color="gray.300"
                      _dark={{ color: "primary" }}
                      fontSize="xl"
                    >
                      ${product?.newPrice}
                    </Text>
                  </CardFooter>
                </Card>
              </Box>
            </div>
          ))}
        </Slider>
        <FormModal isOpen={isOpen} onClose={onClose} modalTitle={"demo"}>
          <OrderForm productInfo={productInfo} onClose={onClose} />
        </FormModal>
      </Box>
    </div>
  );
};

export default ProductSlider;
