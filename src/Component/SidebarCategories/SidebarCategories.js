import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { DataStoreContext } from "../../Context/DataProvider";
import SidebarFilterAccordion from "../SidebarFilterAccordion/SidebarFilterAccordion";

const SidebarCategories = ({
  generateQueryPath,
  setFilterInfo,
  filterInfo,
}) => {
  const { products } = useContext(DataStoreContext);
  // Create an object to store the count of products per category
  const categoryCounts = {};
  // Count the products in each category
  products.forEach((product) => {
    const { categories } = product;
    categoryCounts[categories] = (categoryCounts[categories] || 0) + 1;
  });

  // set category on state
  const handleCategory = (categoryName) => {
    setFilterInfo((prevFilterInfo) => ({
      ...prevFilterInfo,
      category: categoryName,
    }));
    generateQueryPath({ ...filterInfo, category: categoryName });
  };

  return (
    <>
      <SidebarFilterAccordion title={"Furniture"}>
        <VStack align={"left"}>
          {Object.entries(categoryCounts).map(([categoryName, count]) => (
            <HStack
              justify={"space-between"}
              bg={"gray.900"}
              pl={2}
              rounded={"lg"}
              borderColor={
                filterInfo.category === categoryName ? "teal.600" : "gray.700"
              }
              borderWidth={2}
              cursor={"pointer"}
              _hover={{
                borderColor: "teal.600",
              }}
              role="group"
              transition={"all"}
              transitionDuration={".3s"}
              onClick={() => handleCategory(categoryName)}
            >
              <Text key={Math.random()} textTransform={"capitalize"}>
                {categoryName}
              </Text>
              <Text
                key={Math.random()}
                textTransform={"capitalize"}
                borderLeftWidth={2}
                rounded={"md"}
                p={1}
                borderColor={
                  filterInfo?.category === categoryName
                    ? "teal.500"
                    : "gray.600"
                }
                _groupHover={{ borderLeftColor: "teal.500" }}
                transition={"all"}
                transitionDuration={".3s"}
              >
                {count}
              </Text>
            </HStack>
          ))}
        </VStack>
      </SidebarFilterAccordion>
    </>
  );
};

export default SidebarCategories;
