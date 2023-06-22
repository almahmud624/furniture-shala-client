import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import CustomGradientBtn from "../CustomGradientBtn";
import ReadMoreReadLess from "../ReadMoreReadLess";
import { Link, useNavigate } from "react-router-dom";
import { calculateDiscountAmount } from "../../Utilities/calculateDiscountAmount";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const ProductDetails = ({ product, setIsOrder, discount }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
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
  } = product || {};

  // generate tags
  const tags = productName?.split(" ");
  tags?.push(categories);

  return (
    <>
      <Box my={10} maxW={"4xl"} mx={"auto"}>
        <Flex gap={5} flexDir={{ base: "column", md: "row" }}>
          <Box w={{ base: "full", md: "40%" }}>
            <Box w={"full"} h={"full"}>
              <Image
                w={"full"}
                objectFit={"cover"}
                h={"full"}
                src={productImg}
                rounded={{ base: "md", md: "none" }}
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
              action={() => {
                setIsOrder(true);
                !user?.uid && navigate("/login");
              }}
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
    </>
  );
};

export default ProductDetails;
