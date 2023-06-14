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
import { Link } from "react-router-dom";

const ProductDetails = ({ product, setIsOrder }) => {
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
  } = product;

  // generate tags
  const tags = productName.split(" ");
  tags.push(categories);

  return (
    <>
      <Box my={10} maxW={"4xl"} mx={"auto"}>
        <Flex gap={5}>
          <Box w={"40%"}>
            <Box w={"full"} h={"full"}>
              <Image
                w={"full"}
                objectFit={"cover"}
                h={"full"}
                src={productImg}
              />
            </Box>
          </Box>
          <VStack align={"left"} w={"50%"}>
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
                ${oldPrice}
              </Text>
              ${newPrice}
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
              action={() => setIsOrder(true)}
              size={"md"}
              customStyle={{
                h: 10,
                fontSize: "sm",
                w: "fit-content",
              }}
            >
              Buy Now
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
