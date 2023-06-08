import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { DataStoreContext } from "../../../../Context/DataProvider";
import { useNavigate } from "react-router-dom";
import useGetQueryValue from "../../../../Hooks/useGetQueryValue";
const PriceRangeSlider = React.lazy(() =>
  import("../../../../Component/PriceRangeSlider/PriceRangeSlider")
);
const SidebarCategories = React.lazy(() =>
  import("../../../../Component/SidebarCategories/SidebarCategories")
);
const Discount = React.lazy(() =>
  import("../../../../Component/Discount/Discount")
);
const SiderbarSeller = React.lazy(() =>
  import("../../../../Component/SiderbarSellerFilter/SiderbarSeller")
);
const ProductUsageYear = React.lazy(() =>
  import("../../../../Component/ProductUsageYear/ProductUsageYear")
);
const FilterByLocation = React.lazy(() =>
  import("../../../../Component/FilterByLocation/FilterByLocation")
);

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
          <React.Suspense fallback={<Text>Loading...</Text>}>
            <PriceRangeSlider
              max={maximumPrice}
              min={minimumPrice}
              {...commonProps}
            />
          </React.Suspense>
          <React.Suspense fallback={<Text>Loading...</Text>}>
            <SidebarCategories {...commonProps} />
          </React.Suspense>
          <React.Suspense fallback={<Text>Loading...</Text>}>
            <Discount {...commonProps} />
          </React.Suspense>
          <React.Suspense fallback={<Text>Loading...</Text>}>
            <SiderbarSeller {...commonProps} />
          </React.Suspense>
          <React.Suspense fallback={<Text>Loading...</Text>}>
            <ProductUsageYear {...commonProps} />
          </React.Suspense>
          <React.Suspense fallback={<Text>Loading...</Text>}>
            <FilterByLocation {...commonProps} />
          </React.Suspense>
        </Flex>
      </Box>
    </>
  );
};

export default ShopSidebar;
