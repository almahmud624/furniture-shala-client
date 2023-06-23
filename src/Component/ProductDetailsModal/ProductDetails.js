import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import CustomGradientBtn from "../CustomGradientBtn";
import ReadMoreReadLess from "../ReadMoreReadLess";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { calculateDiscountAmount } from "../../Utilities/calculateDiscountAmount";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import OrderForm from "../OrderForm";
import FormModal from "../FormModal";

const ProductDetails = ({ product, setIsOrder, discount }) => {
  const { productId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isDetailsPage = pathname?.split("/")[1] === "product-details";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", productId],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://furniture-shala-server.vercel.app/product/${productId}`
        );
        return data?.[0];
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    categories,
    productImg,
    productName,
    oldPrice,
    description,
    sellerName,
    yearsOfUse,
    newPrice,
    totalSelled,
    createdAt,
    location,
  } = data || product || {};

  // generate tags
  const tags = productName?.split(" ");
  tags?.push(categories);

  const handleOrderDetails = () => {
    if (isDetailsPage) {
      setSelectedProduct(product || data);
      onOpen();
    } else {
      setIsOrder(true);
    }
    !user?.uid && navigate("/login");
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box my={10} maxW={isDetailsPage ? "90%" : "4xl"} mx={"auto"}>
          <Flex gap={5} flexDir={{ base: "column", md: "row" }}>
            <Box w={{ base: "full", md: isDetailsPage ? "50%" : "40%" }}>
              <Box w={"full"} h={isDetailsPage ? "450px" : "full"}>
                <Image
                  w={"full"}
                  objectFit={"cover"}
                  h={"full"}
                  src={productImg}
                  rounded={{ base: "md", md: "sm" }}
                />
              </Box>
            </Box>
            <VStack align={"left"} w={{ base: "full", md: "50%" }}>
              <Text
                textTransform={"capitalize"}
                fontWeight={"thin"}
                color={"gray.300"}
              >
                {categories}
              </Text>
              <Heading size={"lg"} fontSize={"2xl"}>
                {productName}
              </Heading>
              <Text fontWeight={"semibold"} fontSize={"lg"}>
                <Text
                  as={"span"}
                  mr={2}
                  fontWeight={"thin"}
                  color={"red.500"}
                  textDecor={"line-through"}
                >
                  ${discount ? newPrice : oldPrice}
                </Text>
                {discount ? (
                  <Text as={"span"} fontWeight={"thin"} fontSize={"lg"}>
                    ${calculateDiscountAmount(discount, product)}
                  </Text>
                ) : (
                  `$${newPrice}`
                )}
              </Text>
              <ReadMoreReadLess limit={150} boxHeight={24}>
                {description}
              </ReadMoreReadLess>
              <Divider />
              <Text>Posted on : {createdAt}</Text>
              <Divider />
              <Flex gap={5}>
                <Box>
                  <Text>Seller : {sellerName}</Text>
                  {product?.sellerVerify ? (
                    <Text>Verified Seller</Text>
                  ) : (
                    <Text>Location : {location}</Text>
                  )}
                </Box>
                <Divider orientation="vertical" />
                <Box>
                  <Text>Used: {yearsOfUse} Year</Text>
                  {totalSelled ? (
                    <Text>Sold: {totalSelled} item</Text>
                  ) : (
                    <Text>Avaiable: In Stock</Text>
                  )}
                </Box>
              </Flex>
              <CustomGradientBtn
                action={handleOrderDetails}
                size={"md"}
                customStyle={{
                  h: 10,
                  fontSize: "sm",
                  w: "fit-content",
                }}
              >
                Order Now
              </CustomGradientBtn>
            </VStack>
          </Flex>
          <HStack mt={5}>
            <Text fontSize={"lg"} fontWeight={"semibold"}>
              Tags:
            </Text>
            {tags?.map((tag, i) => (
              <Text
                key={Math.random()}
                as="span"
                textTransform={"lowercase"}
                textDecoration={"underline"}
                _hover={{ textDecor: "none" }}
              >
                <Link to={`/search?tag=${tag.toLowerCase()}`}>{tag}</Link>
                <Text as={"span"}>,</Text>
              </Text>
            ))}
          </HStack>
        </Box>
      )}
      <FormModal isOpen={isOpen} onClose={onClose}>
        <OrderForm productInfo={selectedProduct} onClose={onClose} />
      </FormModal>
    </>
  );
};

export default ProductDetails;
