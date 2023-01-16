import { Box } from "@chakra-ui/react";
import React from "react";
import Advertisement from "../Advertisement/Advertisement/Advertisement";
import Categories from "../Categories/Categories";
import Header from "../Header/Header";
import ProductSlider from "../ProductSlider/ProductSlider";
import SiteOverview from "../SiteOverview/SiteOverview";

const Home = () => {
  return (
    <>
      <Box maxWidth={"90%"} margin={"auto"}>
        <Header />
        <ProductSlider />
        <Advertisement />
        <Categories />
        <SiteOverview />
      </Box>
    </>
  );
};

export default Home;
