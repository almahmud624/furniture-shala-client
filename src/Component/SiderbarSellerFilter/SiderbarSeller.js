import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { DataStoreContext } from "../../Context/DataProvider";
import removeDuplicate from "../../Utilities/removeDuplicate";

const SiderbarSeller = ({ filterInfo, setFilterInfo, generateQueryPath }) => {
  const { products } = useContext(DataStoreContext);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSeller = (value) => {
    setFilterInfo({ ...filterInfo, seller: value });
    generateQueryPath({ ...filterInfo, seller: value });
  };

  // using debounce handler making some delay for set price range in query path
  const debounceHandler = (fn, delay) => {
    let timeOutId;
    return (...args) => {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        fn(...args);
      }, [delay]);
    };
  };

  const doQuery = (value) => {
    setSearchQuery(value);
  };

  const handleSearchSeller = debounceHandler(doQuery, 1000);

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
            <Box px={0.5}>
              <Input
                placeholder="Search seller..."
                size="md"
                focusBorderColor="teal.600"
                onChange={(e) => handleSearchSeller(e.target.value)}
              />
            </Box>
            <VStack
              align={"left"}
              mt={2}
              h={52}
              overflowY={"auto"}
              id="scrollbar"
            >
              {removeDuplicate(products, "sellerName")
                ?.filter((value) =>
                  value.toLowerCase().includes(searchQuery.toLowerCase())
                )
                ?.map((sellerName) => (
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
                      sellerName === filterInfo?.seller
                        ? "teal.600"
                        : "gray.700"
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
