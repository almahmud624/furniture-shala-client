import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import ShopSidebar from "./sections/ShopSidebar/ShopSidebar";
import ShopProduct from "./sections/ShopProduct/ShopProduct";

const Shop = () => {
  return (
    <>
      <Box maxWidth={"90%"} margin={"auto"} my={10} pos={"relative"}>
        <Flex justifyContent={"space-between"} align={"center"} gap={5}>
          <Box w={"20%"}>
            <Box pos={"fixed"} top={20} left={10}>
              <ShopSidebar />
            </Box>
          </Box>
          <Box w={"75%"}>
            <ShopProduct />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Shop;
