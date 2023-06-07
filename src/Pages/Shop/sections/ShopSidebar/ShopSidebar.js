import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import PriceRangeSlider from "../../../../Component/PriceRangeSlider/PriceRangeSlider";
import { DataStoreContext } from "../../../../Context/DataProvider";
import { useNavigate } from "react-router-dom";
import SidebarCategories from "../../../../Component/SidebarCategories/SidebarCategories";
import Discount from "../../../../Component/Discount/Discount";
import SiderbarSeller from "../../../../Component/SiderbarSellerFilter/SiderbarSeller";
import useGetQueryValue from "../../../../Hooks/useGetQueryValue";
import ProductUsageYear from "../../../../Component/ProductUsageYear/ProductUsageYear";

const ShopSidebar = () => {
  const { products } = useContext(DataStoreContext);
  const navigate = useNavigate();
  const [queryLoad, setQueryLoad] = useState(false);
  const [
    queryCategory,
    queryDiscount,
    querySeller,
    queryMaxPrice,
    queryMinPrice,
    prodcutUsageQuery,
  ] = useGetQueryValue();

  // find maximum and minimum price of product
  const maximumPrice = Math.max(...products?.map((obj) => obj.newPrice));
  const minimumPrice = Math.min(...products?.map((obj) => obj.newPrice));

  // initial filter state
  const initialFilterState = {
    maxVal: maximumPrice,
    minVal: minimumPrice,
    category: "",
    discount: "",
    seller: "",
    yearsOfUse: "",
  };

  const [filterInfo, setFilterInfo] = useState(initialFilterState);

  // generate filter query path
  const generateQueryPath = (values) => {
    const { maxVal, minVal, category, discount, seller, yearsOfUse } =
      values || {};
    const params = new URLSearchParams({
      maxPrice: maxVal,
      minPrice: minVal,
      _category: category,
      _discount: discount,
      _seller: seller,
      _years_of_use: yearsOfUse,
    });
    const url = `/shop?${params}`;
    navigate(url);
  };

  // clear filter to get back in initial mode
  const handleClearFilter = () => {
    setFilterInfo(initialFilterState);
    navigate("/shop");
  };

  // set query value in filter state, when the page load
  useEffect(() => {
    if (queryLoad) return;
    if (
      queryMaxPrice ||
      queryMinPrice ||
      queryCategory ||
      queryDiscount ||
      querySeller ||
      prodcutUsageQuery
    ) {
      setFilterInfo({
        ...filterInfo,
        maxVal: queryMaxPrice,
        minVal: queryMinPrice,
        category: queryCategory,
        discount: queryDiscount,
        seller: querySeller,
        yearsOfUse: prodcutUsageQuery,
      });
      setQueryLoad(true);
    }
  }, [
    filterInfo,
    setFilterInfo,
    queryLoad,
    queryMaxPrice,
    queryMinPrice,
    queryCategory,
    queryDiscount,
    querySeller,
    prodcutUsageQuery,
  ]);

  return (
    <>
      <Box>
        <HStack justify={"space-between"} textAlign={"right"} mb={5}>
          <Text fontWeight={"semibold"} fontSize={"lg"}>
            Filter
          </Text>
          <Button variant={"outline"} size={"sm"} onClick={handleClearFilter}>
            Clear All
          </Button>
        </HStack>
        <Flex flexDir={"column"} gap={5}>
          <PriceRangeSlider
            max={maximumPrice}
            min={minimumPrice}
            setFilterInfo={setFilterInfo}
            filterInfo={filterInfo}
            generateQueryPath={generateQueryPath}
          />
          <SidebarCategories
            generateQueryPath={generateQueryPath}
            setFilterInfo={setFilterInfo}
            filterInfo={filterInfo}
          />
          <Discount
            setFilterInfo={setFilterInfo}
            filterInfo={filterInfo}
            generateQueryPath={generateQueryPath}
          />
          <SiderbarSeller
            setFilterInfo={setFilterInfo}
            filterInfo={filterInfo}
            generateQueryPath={generateQueryPath}
          />
          <ProductUsageYear
            setFilterInfo={setFilterInfo}
            filterInfo={filterInfo}
            generateQueryPath={generateQueryPath}
          />
        </Flex>
      </Box>
    </>
  );
};

export default ShopSidebar;
