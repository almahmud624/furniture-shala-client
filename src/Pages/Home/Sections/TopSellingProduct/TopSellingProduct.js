import { Box, Grid, Heading, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../../../Component/ProductCard/ProductCard";
import FormModal from "../../../../Component/FormModal";
import OrderForm from "../../../../Component/OrderForm";
import { useState } from "react";

const TopSellingProduct = () => {
  const [productInfo, setProductInfo] = useState(null);
  const { onClose, isOpen, onOpen } = useDisclosure();

  const { data: mostSoldProducts = [], isLoading } = useQuery({
    queryKey: ["most-sold"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "https://furniture-shala-server.vercel.app/most-sold"
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Box mt={20}>
        <Heading
          mb={4}
          fontSize={{
            base: "2xl",
            md: "5xl",
          }}
          fontWeight="bold"
          textAlign={"left"}
          lineHeight={{
            md: "shorter",
          }}
        >
          Top Selling Products
        </Heading>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
          }}
          gap={7}
          mt={10}
        >
          {mostSoldProducts?.map((product) => (
            <ProductCard
              key={product?._id}
              product={product}
              onOpen={onOpen}
              setProductInfo={setProductInfo}
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

export default TopSellingProduct;
