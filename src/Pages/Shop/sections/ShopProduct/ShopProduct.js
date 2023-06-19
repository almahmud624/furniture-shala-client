import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import displayProductCount from "../../../../Utilities/displayItemCount";
import calculatePercentage from "../../../../Utilities/calculatePercentage";
import useGetQueryValue from "../../../../Hooks/useGetQueryValue";
import SortProducts from "../../../../Component/SortProducts/SortProducts";
import { useContext, useState } from "react";
import GridItemCard from "../../../../Component/GridItemCard/GridItemCard";
import Loader from "../../../../Component/Loader";
import { DataStoreContext } from "../../../../Context/DataProvider";

const ShopProduct = () => {
  const [sort, setSort] = useState("");
  const { products: allProducts } = useContext(DataStoreContext);

  // get filter query value
  const [
    queryCategory,
    queryDiscount,
    querySeller,
    queryMaxPrice,
    queryMinPrice,
    prodcutUsageQuery,
    locationQuery,
  ] = useGetQueryValue();

  // Initialize a flag variable
  let showFilterProducts = false;

  // Check if any of the query values is true
  if (
    queryCategory ||
    queryDiscount ||
    querySeller ||
    queryMaxPrice ||
    queryMinPrice ||
    prodcutUsageQuery ||
    locationQuery
  ) {
    showFilterProducts = true;
  }

  // pagination
  const [page, setPage] = useState(1);
  const {
    isLoading,
    isError,
    error,
    data: products,
    isFetching,
  } = useQuery(
    ["users", page],
    async () => {
      const res = await axios.get(
        `https://furniture-shala-server.vercel.app/products?_limit=6&_page=${page}`
      );

      return res.data;
    },
    { keepPreviousData: true }
  );

  // sort products
  const sortedProducts = products?.sort((a, b) => {
    switch (sort) {
      case "to-low":
        return b.newPrice - a.newPrice;
      case "to-high":
        return a.newPrice - b.newPrice;
      case "most-sold":
        return b.totalSelled - a.totalSelled;
      case "latest":
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      default:
        return 0;
    }
  });

  // filter prodcuts
  const filteredProducts = allProducts
    ?.filter((product) => {
      const price = parseInt(product?.newPrice);
      if (queryMinPrice || queryMaxPrice) {
        return price >= queryMinPrice && price <= queryMaxPrice;
      }
      return true;
    })
    ?.filter((product) => {
      if (queryCategory) {
        return queryCategory === product.categories;
      }
      return true;
    })
    ?.filter((product) => {
      const productPercentage = parseInt(
        calculatePercentage(product?.oldPrice, product?.newPrice)
      );
      switch (queryDiscount) {
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
          return true;
      }
    })
    ?.filter((product) => {
      const { sellerName } = product;
      if (querySeller) {
        return querySeller === sellerName;
      }
      return true;
    })
    ?.filter((product) => {
      const { yearsOfUse } = product;
      if (prodcutUsageQuery) {
        return prodcutUsageQuery === yearsOfUse;
      }
      return true;
    })
    ?.filter((product) => {
      const { location } = product;
      if (locationQuery) {
        return locationQuery === location;
      }
      return true;
    });

  // const finally products show by condition
  const showProducts = showFilterProducts ? filteredProducts : sortedProducts;

  const { length: productsLength } = showProducts || [];
  return (
    <>
      <Box>
        <Flex justify={"space-between"} align={"center"} mb={5}>
          <Text mb={3} fontWeight={"thin"} fontSize={"lg"}>
            {displayProductCount(productsLength, "Product")} Found!
          </Text>
          <Box>
            <SortProducts setSort={setSort} sort={sort} />
          </Box>
        </Flex>
        <Grid
          templateColumns={
            productsLength === 0
              ? "1fr"
              : {
                  base: "1fr",
                  md: "repeat(2,1fr)",
                  lg: "repeat(3,1fr)",
                }
          }
          gap={5}
        >
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Text>Error:{error.message}</Text>
          ) : productsLength === 0 ? (
            <Box
              h={"md"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Heading>No Products Found</Heading>
            </Box>
          ) : (
            showProducts?.map((product) => (
              <GridItemCard key={product?._id} product={product} />
            ))
          )}
        </Grid>

        {productsLength > 0 && (
          <Flex justify={"center"} mt={5} gap={5} align={"center"}>
            <Button
              onClick={() => setPage((prevState) => Math.max(prevState - 1, 0))}
              disabled={page === 1}
            >
              Prev Page
            </Button>

            <Button
              onClick={() => setPage((prevState) => prevState + 1)}
              disabled={showFilterProducts}
            >
              Next Page
            </Button>
            <Text fontWeight={"semibold"}>
              {isFetching ? "Loading..." : null}
            </Text>
          </Flex>
        )}
      </Box>
    </>
  );
};

export default ShopProduct;
