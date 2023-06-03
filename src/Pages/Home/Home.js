import { Box } from "@chakra-ui/react";
import Advertisement from "../Advertisement/Advertisement/Advertisement";
import Categories from "../Categories/Categories";
import Header from "../Header/Header";
import Newsletter from "../Newsletter/Newsletter";
import ProductSlider from "../ProductSlider/ProductSlider";
import SiteOverview from "../SiteOverview/SiteOverview";
import SiteFeature from "./Sections/SiteFeature/SiteFeature";
import FeaturedProduct from "./Sections/FeaturedProduct/FeaturedProduct";
import TopSellingProduct from "./Sections/TopSellingProduct/TopSellingProduct";
import SeasonSale from "./Sections/SeasonSale/SeasonSale";
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
        <SeasonSale />
        <TopSellingProduct />
        <SiteOverview />
        <Newsletter />
      </Box>
    </>
  );
};

export default Home;
