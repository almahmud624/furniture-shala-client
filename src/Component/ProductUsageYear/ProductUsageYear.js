import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { DataStoreContext } from "../../Context/DataProvider";
import removeDuplicate from "../../Utilities/removeDuplicate";
import displayProductCount from "../../Utilities/displayItemCount";

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
    setFilterInfo({ ...filterInfo, yearsOfUse: value });
    generateQueryPath({ ...filterInfo, yearsOfUse: value });
  };
  return (
    <>
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton px={0}>
              <Box
                as="span"
                flex="1"
                textAlign="left"
                fontSize={"lg"}
                fontWeight={"semibold"}
              >
                Years Of Use
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} px={0}>
            <VStack
              align={"left"}
              mt={2}
              h={52}
              overflowY={"auto"}
              id="scrollbar"
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
                    borderColor: "teal.600",
                  }}
                  borderColor={
                    yearsOfUse === filterInfo?.yearsOfUse
                      ? "teal.600"
                      : "gray.700"
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ProductUsageYear;
