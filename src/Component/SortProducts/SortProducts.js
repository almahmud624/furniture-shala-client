import { Box, Flex, Select, Text } from "@chakra-ui/react";
import React from "react";

const SortProducts = ({ setSort }) => {
  return (
    <>
      <Flex justify={"right"} align={"center"}>
        <Text fontSize={"lg"} fontWeight={"thin"}>
          Sort By
        </Text>

        <Select
          flex={1}
          bg={"transparent"}
          borderWidth={0}
          w={"full"}
          focusBorderColor="transparent"
          fontWeight={"semibold"}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="to-low">High To Low</option>
          <option value="to-high">Low To High</option>
          <option value="most-sold">Most Sold</option>
          <option value="latest">Latest</option>
        </Select>
      </Flex>
    </>
  );
};

export default SortProducts;
