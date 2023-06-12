import { Box, Flex, Image } from "@chakra-ui/react";
import { Countdown } from "../../Component/Countdown";
import { useState } from "react";
import flashSaleImg from "../../Assets/flash-sale.png";
import PageHeader from "../../Component/PageHeader/PageHeader";
import { LazyLoadImage } from "react-lazy-load-image-component";
const FlashSale = () => {
  const [couponStatus, setCouponStatus] = useState({});
  return (
    <>
      <Box maxW={"90%"} mx="auto" py={10}>
        <Flex textAlign={"center"} justify={"space-between"}>
          <Box w={"50%"}>
            <PageHeader
              pageTag={"Week Deal"}
              title={"Deal of the week"}
              headerStyle={{
                bgGradient: "linear(to-l, #D79E41, #2F855A)",
                bgClip: "text",
              }}
            >
              <Countdown
                setCouponStatus={setCouponStatus}
                couponDuration={7 * 24 * 60 * 60}
                productId={"_id"}
                couponStatus={couponStatus}
              />
            </PageHeader>
          </Box>

          <Box w={"40%"}>
            <LazyLoadImage effect="blur" src={flashSaleImg} />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default FlashSale;
