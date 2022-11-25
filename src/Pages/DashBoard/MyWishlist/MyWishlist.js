import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Flex,
  Image,
  Stack,
  Text,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { DataStoreContext } from "../../../Context/DataProvider";

const MyWishlist = () => {
  const { sellerProducts } = useContext(DataStoreContext);
  const wishList = sellerProducts.filter(
    (product) => product?.wishListed === true
  );
  console.log(wishList);

  return (
    <div>
      <Heading
        as="h3"
        size={["lg", "xl", "2xl"]}
        marginBottom={"5"}
        noOfLines={1}
      >
        My WishList
      </Heading>

      <SimpleGrid columns={[1, 2, 3]} gap={"5"}>
        {wishList?.map((product) => (
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            maxH={"20"}
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={product?.productImg}
              alt="Caffe Latte"
            />

            <Stack spacing={"2"}>
              <CardBody>
                <Heading size="sm">The perfect latte</Heading>
                <Button variant="solid" colorScheme="blue" size={"xs"} mt={"2"}>
                  Buy Latte
                </Button>
              </CardBody>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default MyWishlist;
