import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Countdown } from "../../Component/Countdown";
import { useContext, useState } from "react";
import flashSaleImg from "../../Assets/flash-sale.png";
import PageHeader from "../../Component/PageHeader/PageHeader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { DataStoreContext } from "../../Context/DataProvider";
import ProductModal from "../../Component/ProductDetailsModal/ProductModal";
import { calculateDiscountAmount } from "../../Utilities/calculateDiscountAmount";
import useDynamicTitle from "../../Hooks/useDynamicTitle";
const FlashSale = () => {
  useDynamicTitle("Flash Sale");
  const [couponStatus, setCouponStatus] = useState({});
  const { products } = useContext(DataStoreContext);
  const [selectedProduct, setSelectedProduct] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleProduct = (product) => {
    setSelectedProduct(product || {});
    onOpen();
  };

  return (
    <>
      <Box maxW={"90%"} mx="auto" py={10}>
        <Flex
          textAlign={"center"}
          justify={"space-between"}
          flexDir={{ base: "column", md: "row" }}
        >
          <Box w={{ base: "full", md: "50%" }}>
            <PageHeader
              pageTag={"Week Deal"}
              title={"Deal of the week"}
              headerStyle={{
                bgGradient: "linear(to-l, #D79E41, #2F855A)",
                bgClip: "text",
              }}
            >
              <Countdown
                setCouponStatus={setCouponStatus}
                couponDuration={7 * 24 * 60 * 60}
                productId={"_id"}
                couponStatus={couponStatus}
              />
            </PageHeader>
          </Box>

          <Box w={{ base: "full", md: "40%" }}>
            <LazyLoadImage effect="blur" src={flashSaleImg} />
          </Box>
        </Flex>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
          }}
          gap={5}
          rowGap={20}
          mt={20}
        >
          {products?.slice(0, 4)?.map((product) => (
            <FlashSaleCard
              key={product?._id}
              product={product}
              handleProduct={handleProduct}
            />
          ))}
        </Grid>
      </Box>
      <ProductModal
        product={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        isOpen={isOpen}
        onClose={onClose}
        discount={11}
      />
    </>
  );
};

function FlashSaleCard({ product = {}, handleProduct }) {
  const { productName, productImg, newPrice } = product;
  return (
    <>
      <GridItem
        p={3}
        borderWidth={1}
        borderRadius={5}
        bg={"secondary"}
        boxShadow={"0px 10px 8px 1px rgba(0,0,0,0.25)"}
        _hover={{ boxShadow: "none" }}
        transition={"all"}
        transitionDuration={".4s"}
      >
        <Box h={"fit-content"}>
          <Image
            w={"full"}
            h={"full"}
            src={productImg}
            borderRadius={5}
            mt={-12}
            boxShadow={"0px 0px 8px 4px rgba(0,0,0,0.35)"}
          />
        </Box>
        <Flex
          flexDir={"column"}
          justifyContent={"space-between"}
          minH={"44"}
          mt={3}
          gap={2}
          color={"gray.200"}
        >
          <Heading size={"md"} fontWeight={"semibold"}>
            {productName}
          </Heading>
          <Text fontWeight={"normal"} fontSize={"lg"}>
            ${calculateDiscountAmount(11, product)}
          </Text>
          <Text fontWeight={"normal"} fontSize={"lg"} color={"red.600"}>
            <Text as={"span"} textDecor={"line-through"}>
              ${newPrice}
            </Text>{" "}
            - 11%
          </Text>
          <Button
            variant={"outline"}
            borderColor={"primary"}
            color={"gray.200"}
            bg={"transparent"}
            _hover={{ bg: "primary", borderColor: "secondary" }}
            transition={"all .3s"}
            onClick={() => handleProduct(product)}
          >
            Discover
          </Button>
        </Flex>
      </GridItem>
    </>
  );
}

export default FlashSale;
