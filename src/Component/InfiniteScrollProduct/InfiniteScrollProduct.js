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
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import CustomGradientBtn from "../CustomGradientBtn";
import { useInView } from "react-intersection-observer";
import { useContext, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { DataStoreContext } from "../../Context/DataProvider";
import GridItemCard from "../GridItemCard/GridItemCard";

const InfiniteScrollProduct = ({ searchQuery }) => {
  const { products: allProducts } = useContext(DataStoreContext);
  const { ref, inView } = useInView();
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
        `https://furniture-shala-server.vercel.app/products?_limit=4&_page=${pageParam}`
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
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  // combine the prodcut array
  let products;
  if (data) {
    products = [].concat(...data?.pages);
  }

  // filter data by price range
  // applied filter on all products when search query available
  const filteredProducts = allProducts?.filter((product) =>
    product?.productName?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <>
      <Box mt={5}>
        <Text mb={5} fontSize={"lg"} fontWeight={"thin"}>
          {filteredProducts?.length === 0
            ? "Sorry, there are no results for"
            : searchQuery && "Showing result for"}{" "}
          {searchQuery}
        </Text>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
          }}
          gap={{ base: 7, md: 5 }}
        >
          {status === "loading" ? (
            <Text>Loading...</Text>
          ) : status === "error" ? (
            <Text>Error:{error.message}</Text>
          ) : (
            (searchQuery ? filteredProducts : products)?.map((product) => (
              <GridItemCard key={product?._id} product={product} />
            ))
          )}
        </Grid>
        {filteredProducts?.length > 0 ? (
          <Flex mt={7} justifyContent={"center"}>
            <Button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <ThreeDots height="32" width="32" color="teal" />
              ) : hasNextPage ? (
                "Load More"
              ) : (
                "You Reached The Limit"
              )}
            </Button>
          </Flex>
        ) : undefined}
      </Box>
    </>
  );
};

export default InfiniteScrollProduct;
