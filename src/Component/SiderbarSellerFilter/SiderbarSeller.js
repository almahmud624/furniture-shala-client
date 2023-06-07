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

const removeDuplicate = (products) => {
  const sellers = products?.map((product) => product?.sellerName);
  const removeDuplicateSeller = sellers?.filter(
    (v, i) => sellers.indexOf(v) === i
  );
  return removeDuplicateSeller;
};

const SiderbarSeller = ({ filterInfo, setFilterInfo, generateQueryPath }) => {
  const { products } = useContext(DataStoreContext);
  const handleSeller = (value) => {
    setFilterInfo({ ...filterInfo, seller: value });
    generateQueryPath({ ...filterInfo, seller: value });
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
                Seller
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
              {removeDuplicate(products)?.map((sellerName) => (
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
                    sellerName === filterInfo?.seller ? "teal.600" : "gray.700"
                  }
                  role="group"
                  transition={"all"}
                  transitionDuration={".3s"}
                  onClick={() => handleSeller(sellerName)}
                >
                  <Text key={Math.random()} textTransform={"capitalize"}>
                    {sellerName}
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

export default SiderbarSeller;
