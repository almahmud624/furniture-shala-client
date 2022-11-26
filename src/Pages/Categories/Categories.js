import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
  Grid,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataStoreContext } from "../../Context/DataProvider";

const Categories = () => {
  const { sellerProducts } = useContext(DataStoreContext);
  const duplicateCategories = sellerProducts.map((i) => i.categories);
  const categories = duplicateCategories.filter(
    (v, i) => duplicateCategories.indexOf(v) === i
  );

  return (
    <div>
      <SimpleGrid
        alignItems="center"
        justifyContent="center"
        columns={[1, 2, 3]}
        maxW={"container.xl"}
        mx={"auto"}
        gap={5}
        py={8}
      >
        {categories?.map((category) => (
          <Box>
            <SimpleGrid placeItems={"center"}>
              <Link to={`/categories/${category}`}>
                <Heading
                  as={"h3"}
                  fontSize={"xl"}
                  style={{ textTransform: "capitalize" }}
                  p={10}
                  cursor={"pointer"}
                  bg="gray.600"
                  _dark={{
                    bg: "gray.700",
                  }}
                  borderRadius={"md"}
                  _hover={{ bg: "gray.900" }}
                >
                  {category} Furniture
                </Heading>
              </Link>
            </SimpleGrid>
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Categories;
