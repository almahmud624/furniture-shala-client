import { HStack, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { DataStoreContext } from "../../Context/DataProvider";
import removeDuplicate from "../../Utilities/removeDuplicate";
import displayProductCount from "../../Utilities/displayItemCount";
import SidebarFilterAccordion from "../SidebarFilterAccordion/SidebarFilterAccordion";

const displayYearMonth = (value) => {
  const years = parseFloat(value?.split(".")[0]);
  const months = parseFloat(value?.split(".")[1]);
  const yearsMonths = `${displayProductCount(years, "Year")} ${
    months ? displayProductCount(months, "Month") : ""
  }`;
  return yearsMonths;
};

const ProductUsageYear = ({ filterInfo, setFilterInfo, generateQueryPath }) => {
  const { products } = useContext(DataStoreContext);
  const handleProdcutUsage = (value) => {
    setFilterInfo((prevFilterInfo) => ({
      ...prevFilterInfo,
      yearsOfUse: value,
    }));
    generateQueryPath({ ...filterInfo, yearsOfUse: value });
  };
  return (
    <>
      <SidebarFilterAccordion
        title={"Years Of Use"}
        filterValue={filterInfo?.yearsOfUse}
      >
        <VStack
          align={"left"}
          mt={2}
          h={52}
          overflowY={"auto"}
          id="scrollbar"
          color={"gray.200"}
        >
          {removeDuplicate(products, "yearsOfUse")?.map((yearsOfUse) => (
            <HStack
              key={Math.random()}
              justify={"space-between"}
              bg={"gray.900"}
              pl={2}
              py={1}
              rounded={"md"}
              borderWidth={2}
              cursor={"pointer"}
              _hover={{
                borderColor: "primary",
              }}
              borderColor={
                yearsOfUse === filterInfo?.yearsOfUse ? "primary" : "gray.700"
              }
              role="group"
              transition={"all"}
              transitionDuration={".3s"}
              onClick={() => handleProdcutUsage(yearsOfUse)}
            >
              <Text key={Math.random()} textTransform={"capitalize"}>
                {displayYearMonth(yearsOfUse)}
              </Text>
            </HStack>
          ))}
        </VStack>
      </SidebarFilterAccordion>
    </>
  );
};

export default ProductUsageYear;
