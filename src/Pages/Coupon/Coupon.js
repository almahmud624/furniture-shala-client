import PageHeader from "../../Component/PageHeader/PageHeader";
import ProductCoupon from "../Home/Sections/ProductCoupon/ProductCoupon";
import elevenPercentImg from "../../Assets/elevenPercent.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import FormModal from "../../Component/FormModal";
import OrderForm from "../../Component/OrderForm";
import useDynamicTitle from "../../Hooks/useDynamicTitle";
const { Box, Flex, useDisclosure } = require("@chakra-ui/react");

const Coupon = () => {
  useDynamicTitle("Coupon");
  const products = JSON.parse(
    localStorage.getItem("furniture_shala_featured_product")
  );
  const [productInfo, setProductInfo] = useState(null);
  const { onClose, isOpen, onOpen } = useDisclosure();
  const [coupon, setCoupon] = useState(null);
  return (
    <>
      <Box maxW={"90%"} mx={"auto"} py={10}>
        <Flex
          justify={"center"}
          align={"center"}
          flexDir={{ base: "column", md: "row" }}
          gap={{ base: 5, md: 0 }}
        >
          <Box flex={"1"}>
            <PageHeader
              pageTag={"Coupon"}
              title={"Discover Amazing Coupons and Discounts"}
              tagStyle={{ align: "left", w: "fit-content" }}
            >
              Welcome to our Coupon Page, where you can find a wide range of
              exclusive discounts and savings on your favorite products. We've
              partnered with top brands to bring you the best deals and special
              offers available.Don't miss out on these incredible savings
              opportunities – start exploring our coupons today and make every
              purchase a smart one!
            </PageHeader>
          </Box>
          <Flex flex={"1"} justify={"right"}>
            <Box
              width={{ base: "full", md: "80%" }}
              border={"1px solid #2D3748"}
              rounded="md"
              boxShadow={"0px 0px 14px 0px rgba(0,0,0,0.45) "}
              p={2}
            >
              <LazyLoadImage
                effect="blur"
                src={elevenPercentImg}
                style={{ borderRadius: "7px", width: "100%", height: "100%" }}
              />
            </Box>
          </Flex>
        </Flex>
        <Flex
          justify={"space-between"}
          mt={10}
          flexDir={{ base: "column", md: "column", lg: "row" }}
          gap={{ base: 5, md: 12, lg: 0 }}
        >
          {products?.map((product) => (
            <ProductCoupon
              key={Math.random()}
              product={product}
              setProductInfo={setProductInfo}
              onOpen={onOpen}
              setCoupon={setCoupon}
            />
          ))}
        </Flex>
      </Box>
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        coupon={coupon}
        setCoupon={setCoupon}
      >
        <OrderForm
          productInfo={productInfo}
          onClose={onClose}
          coupon={coupon}
          setCoupon={setCoupon}
        />
      </FormModal>
    </>
  );
};

export default Coupon;
