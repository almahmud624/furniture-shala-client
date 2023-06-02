import { Box } from "@chakra-ui/react";
import Advertisement from "../Advertisement/Advertisement/Advertisement";
import Categories from "../Categories/Categories";
import Header from "../Header/Header";
import Newsletter from "../Newsletter/Newsletter";
import ProductSlider from "../ProductSlider/ProductSlider";
import SiteOverview from "../SiteOverview/SiteOverview";
import FeaturedProduct from "../../Component/FeaturedProduct/FeaturedProduct";
import SiteFeature from "../../Component/SiteFeature/SiteFeature";
import TopSellingProduct from "../../Component/TopSellingProduct/TopSellingProduct";

const Home = () => {
  return (
    <>
      <Box maxWidth={"90%"} margin={"auto"}>
        <Header />
        <ProductSlider />
        <SiteFeature />
        <Advertisement />
        <Categories />
        <FeaturedProduct />
        <TopSellingProduct />
        <SiteOverview />
        <Newsletter />
      </Box>
    </>
  );
};

export default Home;
