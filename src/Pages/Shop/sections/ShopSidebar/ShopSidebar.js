import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { DataStoreContext } from "../../../../Context/DataProvider";
import { useNavigate } from "react-router-dom";
import useGetQueryValue from "../../../../Hooks/useGetQueryValue";
import PriceRangeSlider from "../../../../Component/PriceRangeSlider/PriceRangeSlider";
import SidebarCategories from "../../../../Component/SidebarCategories/SidebarCategories";
import Discount from "../../../../Component/Discount/Discount";
import SiderbarSeller from "../../../../Component/SiderbarSellerFilter/SiderbarSeller";
import ProductUsageYear from "../../../../Component/ProductUsageYear/ProductUsageYear";
import FilterByLocation from "../../../../Component/FilterByLocation/FilterByLocation";
import displayProductCount from "../../../../Utilities/displayItemCount";

const ShopSidebar = ({ productsCount }) => {
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
    locationQuery,
  ] = useGetQueryValue();

  // find maximum and minimum price of product
  const maximumPrice = useMemo(
    () => Math.max(...products?.map((obj) => obj.newPrice)),
    [products]
  );
  const minimumPrice = useMemo(
    () => Math.min(...products?.map((obj) => obj.newPrice)),
    [products]
  );

  // initial filter state
  const initialFilterState = {
    maxVal: maximumPrice,
    minVal: minimumPrice,
    category: "",
    discount: "",
    seller: "",
    yearsOfUse: "",
    location: "",
  };

  const [filterInfo, setFilterInfo] = useState(initialFilterState);

  // generate filter query path
  const generateQueryPath = (values) => {
    const { maxVal, minVal, category, discount, seller, yearsOfUse, location } =
      values || {};
    const params = new URLSearchParams({
      maxPrice: maxVal,
      minPrice: minVal,
      _category: category,
      _discount: discount,
      _seller: seller,
      _years_of_use: yearsOfUse,
      _location: location,
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
    const filterValues = {
      maxVal: queryMaxPrice,
      minVal: queryMinPrice,
      category: queryCategory,
      discount: queryDiscount,
      seller: querySeller,
      yearsOfUse: prodcutUsageQuery,
      location: locationQuery,
    };
    const hasFilterValues = Object.values(filterValues).some((value) => value);
    if (hasFilterValues) {
      setFilterInfo((prevFilterInfo) => ({
        ...prevFilterInfo,
        ...filterValues,
      }));
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
    locationQuery,
  ]);

  // props object with common props
  const commonProps = {
    setFilterInfo,
    filterInfo,
    generateQueryPath,
  };
  return (
    <>
      <Box
        h={{ base: "fit-content", md: "md" }}
        overflow={{ base: "none", md: "auto" }}
        id="scrollbar"
      >
        <Text
          fontWeight={"thin"}
          fontSize={"lg"}
          display={{ base: "block", md: "none" }}
          mb={5}
        >
          {displayProductCount(productsCount, "Product")} Found!
        </Text>
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
            {...commonProps}
          />
          <SidebarCategories {...commonProps} />
          <Discount {...commonProps} />
          <SiderbarSeller {...commonProps} />
          <ProductUsageYear {...commonProps} />
          <FilterByLocation {...commonProps} />
        </Flex>
      </Box>
    </>
  );
};

export default ShopSidebar;
