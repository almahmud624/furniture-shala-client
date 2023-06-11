import ProductCoupon from "../Home/Sections/ProductCoupon/ProductCoupon"

const { Box, Flex, Heading, Text, Image } = require("@chakra-ui/react")

const Coupon = () => {
  const products = JSON.parse(localStorage.getItem("furniture_shala_featured_product"))
    return(
        <>
        <Box maxW={'90%'} mx={'auto'} py={10}>
        <Flex justify={"center"} align={"center"}>
          <Box flex={"1"}>
            <Heading>Become seller on furniture shala</Heading>
            <Text as={"p"} mt={4} color={"gray.400"}>
              lSed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium,On the other hand, we denounce
              with righteous indignation and dislike men who are so beguiled and
              demoralized by the charms of pleasure of the moment, so blinded by
              desire, that they cannot foresee the pain and trouble that are
              bound to ensue; and equal blame belongs to those who fail in their
              duty through weakness of will
            </Text>
          </Box>
          <Flex flex={"1"} justify={"right"}>
            <Box
              width={"80%"}
              border={"1px solid #2D3748"}
             rounded='md'
              boxShadow={"0px 0px 14px 0px rgba(0,0,0,0.45) "}
              p={2}
            >
              <Image
                h={"full"}
                w={"full"}
                rounded="md"
               
                src="https://img.freepik.com/free-photo/salesman-shows-color-swatches-lady-customer-new-kitchen-furniture_93675-134887.jpg?w=740&t=st=1686321235~exp=1686321835~hmac=9e0653e1b75f7485dc899ec8cf4a465c9d7494638c8de249c6c14ab6d7a6fa0b"
              />
            </Box>
          </Flex>
        </Flex>
        <Flex justify={'space-between'} mt={10}>
          {products?.map(product=><ProductCoupon key={Math.random()} product={product} />)}
        </Flex>
        </Box>
        </>
    )
}

export default Coupon