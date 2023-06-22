import React, { useState } from "react";
import { Box, Text, Grid, useDisclosure, chakra } from "@chakra-ui/react";
import FormModal from "../../Component/FormModal";
import OrderForm from "../../Component/OrderForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../Component/Loader";
import ProductCard from "../../Component/ProductCard/ProductCard";

const CategoryProducts = () => {
  const { category } = useParams();

  const [productInfo, setProductInfo] = useState(null);
  const { onClose, isOpen, onOpen } = useDisclosure();

  // get all category base data
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://furniture-shala-server.vercel.app/products?category=${category}`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Box maxW={"90%"} mx={"auto"} px={4} py={24}>
        <Box>
          <chakra.h2
            fontSize={{
              base: "2xl",
              md: "4xl",
            }}
            fontWeight="medium"
            textAlign={{
              base: "center",
              md: "left",
            }}
            color="gray.900"
            _dark={{
              color: "gray.400",
            }}
            lineHeight={{
              md: "shorter",
            }}
          >
            Best{" "}
            <Text
              display={"inline-block"}
              textTransform={"capitalize"}
              textColor={"#276749"}
            >
              {category}
            </Text>{" "}
            furniture For You
          </chakra.h2>
        </Box>
        <Grid
          templateColumns={["repeat(1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
          gap={7}
          mt={7}
        >
          {products?.map((product) => (
            <ProductCard
              key={product?._id}
              product={product}
              setProductInfo={setProductInfo}
              onOpen={onOpen}
            />
          ))}
        </Grid>
      </Box>
      <FormModal isOpen={isOpen} onClose={onClose}>
        <OrderForm productInfo={productInfo} onClose={onClose} />
      </FormModal>
    </>
  );
};

export default CategoryProducts;
