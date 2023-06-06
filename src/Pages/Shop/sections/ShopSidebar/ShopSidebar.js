import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import PriceRangeSlider from "../../../../Component/PriceRangeSlider/PriceRangeSlider";
import { DataStoreContext } from "../../../../Context/DataProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import SidebarCategories from "../../../../Component/SidebarCategories/SidebarCategories";

const ShopSidebar = () => {
  const { products } = useContext(DataStoreContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get("_category");
  // find maximum and minimum price of product
  const maximumPrice = Math.max(...products?.map((obj) => obj.newPrice));
  const minimumPrice = Math.min(...products?.map((obj) => obj.newPrice));
  const [minVal, setMinVal] = useState(minimumPrice);
  const [maxVal, setMaxVal] = useState(maximumPrice);
  const [category, setCategory] = useState(queryCategory);

  // generate filter query path
  const generateQueryPath = (values) => {
    const { max, min, category } = values || {};
    const params = new URLSearchParams({
      maxPrice: max,
      minPrice: min,
      _category: category,
    });
    const url = `/shop?${params}`;
    navigate(url);
  };

  // clear filter to get back in initial mode
  const handleClearFilter = () => {
    setMinVal(minimumPrice);
    setMaxVal(maximumPrice);
    setCategory("");
    navigate("/shop");
  };
  return (
    <>
      <Box>
        <Heading>Sidebar Content</Heading>
        <Box textAlign={"right"} mt={5}>
          <Button variant={"outline"} size={"sm"} onClick={handleClearFilter}>
            Clear All
          </Button>
        </Box>
        <Flex flexDir={"column"} gap={5}>
          <PriceRangeSlider
            max={maximumPrice}
            min={minimumPrice}
            minVal={minVal}
            maxVal={maxVal}
            setMinVal={setMinVal}
            setMaxVal={setMaxVal}
            generateQueryPath={generateQueryPath}
            category={category}
          />
          <SidebarCategories
            setCategory={setCategory}
            category={category}
            generateQueryPath={generateQueryPath}
            minVal={minVal}
            maxVal={maxVal}
          />
        </Flex>
      </Box>
    </>
  );
};

export default ShopSidebar;
