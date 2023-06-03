import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CustomGradientBtn from "../../../../Component/CustomGradientBtn";

const TopSellingProduct = () => {
  const { data: mostSoldProducts = [], isLoading } = useQuery({
    queryKey: ["most-sold"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "https://furniture-shala-server.vercel.app/most-sold"
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Box mt={20}>
      <Heading
        mb={4}
        fontSize={{
          base: "2xl",
          md: "5xl",
        }}
        fontWeight="bold"
        textAlign={"left"}
        lineHeight={{
          md: "shorter",
        }}
      >
        Top Selling Products
      </Heading>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap={7}
        mt={10}
      >
        {mostSoldProducts?.map(
          ({ productName, productImg, newPrice, categories }) => (
            <GridItem
              key={Math.random()}
              overflow={"hidden"}
              borderBottomWidth={1}
              borderLeftWidth={1}
              borderRightWidth={1}
            >
              <Flex
                flexDir={"column"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box w={"full"}>
                  <Box w={"full"} h={"250px"}>
                    <Image
                      src={productImg}
                      w={"full"}
                      h={"full"}
                      objectFit={"cover"}
                    />
                  </Box>
                </Box>
                <VStack gap={1} align={"left"} py={3} px={3}>
                  <Text
                    textTransform={"capitalize"}
                    px={3}
                    py={1}
                    bg={"red.600"}
                    display={"inline"}
                    w={"fit-content"}
                  >
                    {categories}
                  </Text>
                  <Heading size={"lg"} fontSize={"2xl"} fontWeight={"semibold"}>
                    {productName}
                  </Heading>
                  <Text
                    fontWeight={"thin"}
                    fontSize={"2xl"}
                    fontFamily={"cursive"}
                  >
                    ${newPrice}
                  </Text>
                  <CustomGradientBtn>Order Now</CustomGradientBtn>
                </VStack>
              </Flex>
            </GridItem>
          )
        )}
      </Grid>
    </Box>
  );
};

export default TopSellingProduct;
