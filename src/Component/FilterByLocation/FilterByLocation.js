import { Box, HStack, Input, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { DataStoreContext } from "../../Context/DataProvider";
import removeDuplicate from "../../Utilities/removeDuplicate";
import SidebarFilterAccordion from "../SidebarFilterAccordion/SidebarFilterAccordion";

const FilterByLocation = ({ filterInfo, setFilterInfo, generateQueryPath }) => {
  const { products } = useContext(DataStoreContext);
  const [searchQuery, setSearchQuery] = useState("");
  const handlelocation = (value) => {
    setFilterInfo((prevFilterInfo) => ({ ...prevFilterInfo, location: value }));
    generateQueryPath({ ...filterInfo, location: value });
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

  const handleSearchlocation = debounceHandler(doQuery, 1000);

  return (
    <>
      <SidebarFilterAccordion
        title={"Location"}
        filterValue={filterInfo?.location}
      >
        <Box px={0.5}>
          <Input
            placeholder="Search location..."
            size="md"
            focusBorderColor="teal.600"
            onChange={(e) => handleSearchlocation(e.target.value)}
          />
        </Box>
        <VStack
          align={"left"}
          mt={2}
          h={52}
          overflowY={"auto"}
          id="scrollbar"
          color={"gray.200"}
        >
          {removeDuplicate(products, "location")
            ?.filter((value) =>
              value.toLowerCase().includes(searchQuery.toLowerCase())
            )
            ?.map((location) => (
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
                  location === filterInfo?.location ? "teal.600" : "gray.700"
                }
                role="group"
                transition={"all"}
                transitionDuration={".3s"}
                onClick={() => handlelocation(location)}
              >
                <Text key={Math.random()} textTransform={"capitalize"}>
                  {location}
                </Text>
              </HStack>
            ))}
        </VStack>
      </SidebarFilterAccordion>
    </>
  );
};

export default FilterByLocation;
