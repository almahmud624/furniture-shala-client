import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import CustomGradientBtn from "../../../../Component/CustomGradientBtn";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import displayProductCount from "../../../../Utilities/displayItemCount";
import calculatePercentage from "../../../../Utilities/calculatePercentage";

const ShopProduct = () => {
  const [searchParams] = useSearchParams();
  const minPrice = parseInt(searchParams.get("minPrice"));
  const maxPrice = parseInt(searchParams.get("maxPrice"));
  const category = searchParams.get("_category");
  const discount = searchParams.get("_discount");

  // get data by inifinite scrolling
  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["projects"],
    async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `https://furniture-shala-server.vercel.app/products?_limit=3&_page=${pageParam}`
      );

      return res.data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage?.length === 0 ? undefined : allPages.length + 1;
        return nextPage;
      },
    }
  );

  // combine the prodcut array
  let products;
  if (data) {
    products = [].concat(...data?.pages);
  }
  // filter data by price range

  const filteredProducts = products
    ?.filter((product) => {
      const price = parseInt(product?.newPrice);
      if (minPrice || maxPrice) {
        return price >= minPrice && price <= maxPrice;
      }
      return products;
    })
    ?.filter((product) => {
      if (category) {
        return category === product.categories;
      }
      return products;
    })
    ?.filter((product) => {
      const productPercentage = parseInt(
        calculatePercentage(product?.oldPrice, product?.newPrice)
      );
      switch (discount) {
        case "10_or_more":
          return productPercentage >= 10 && productPercentage < 20;
        case "20_or_more":
          return productPercentage >= 20 && productPercentage < 30;
        case "30_or_more":
          return productPercentage >= 30 && productPercentage < 40;
        case "40_or_more":
          return productPercentage >= 40 && productPercentage < 50;
        case "50_or_more":
          return productPercentage >= 50;
        default:
          return products;
      }
    });

  return (
    <>
      <Box>
        <Text mb={3} fontWeight={"semibold"}>
          {displayProductCount(filteredProducts?.length, "Prodcut")} Found!
        </Text>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2,1fr)",
            lg: "repeat(3,1fr)",
          }}
          gap={5}
        >
          {status === "loading" ? (
            <Text>Loading...</Text>
          ) : status === "error" ? (
            <Text>Error:{error.message}</Text>
          ) : (
            filteredProducts?.map(
              ({ productName, productImg, newPrice, categories }) => (
                <GridItem
                  key={Math.random()}
                  overflow={"hidden"}
                  borderBottomWidth={1}
                  borderLeftWidth={1}
                  borderRightWidth={1}
                >
                  <Flex
                    flexDir={"column"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Box w={"full"}>
                      <Box w={"full"} h={"250px"}>
                        <Image
                          src={productImg}
                          w={"full"}
                          h={"full"}
                          objectFit={"cover"}
                        />
                      </Box>
                    </Box>
                    <VStack gap={1} align={"left"} py={3} px={3}>
                      <Text
                        textTransform={"capitalize"}
                        px={3}
                        py={1}
                        bg={"red.600"}
                        display={"inline"}
                        w={"fit-content"}
                      >
                        {categories}
                      </Text>
                      <Heading
                        size={"lg"}
                        fontSize={"xl"}
                        fontWeight={"semibold"}
                      >
                        {productName}
                      </Heading>
                      <Text
                        fontWeight={"thin"}
                        fontSize={"xl"}
                        fontFamily={"cursive"}
                      >
                        ${newPrice}
                      </Text>
                      <CustomGradientBtn customStyle={{ h: "10" }}>
                        Order Now
                      </CustomGradientBtn>
                    </VStack>
                  </Flex>
                </GridItem>
              )
            )
          )}
        </Grid>
        <Flex mt={7} justifyContent={"center"}>
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "You Reached The Limit"}
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default ShopProduct;
