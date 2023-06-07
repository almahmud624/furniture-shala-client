import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const data = [
  { title: "10% or more", value: "10_or_more" },
  { title: "20% or more", value: "20_or_more" },
  { title: "30% or more", value: "30_or_more" },
  { title: "40% or more", value: "40_or_more" },
  { title: "50% or more", value: "50_or_more" },
];
const Discount = ({ filterInfo, setFilterInfo, generateQueryPath }) => {
  const [searchParams] = useSearchParams();
  const queryDiscount = searchParams.get("_discount");
  const [queryLoad, setQueryLoad] = useState(false);
  const handleDiscount = (value) => {
    setFilterInfo({ ...filterInfo, discount: value });
    generateQueryPath({ ...filterInfo, discount: value });
  };

  // set query discount value in filter info
  useEffect(() => {
    if (queryLoad) return;
    if (queryDiscount) {
      setFilterInfo({ ...filterInfo, discount: queryDiscount });
      setQueryLoad(true);
    }
  }, [queryDiscount, filterInfo, setFilterInfo, queryLoad]);
  return (
    <>
      <Box>
        <Text fontSize={"lg"} fontWeight={"semibold"}>
          Discounts
        </Text>
        <VStack align={"left"} mt={2}>
          {data.map(({ title, value }) => (
            <HStack
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
                value === filterInfo?.discount ? "teal.600" : "gray.700"
              }
              role="group"
              transition={"all"}
              transitionDuration={".3s"}
              onClick={() => handleDiscount(value)}
            >
              <Text key={Math.random()} textTransform={"capitalize"}>
                {title}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    </>
  );
};

export default Discount;
