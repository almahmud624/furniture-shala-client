import { Box, Heading, SimpleGrid, chakra } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataStoreContext } from "../../Context/DataProvider";

const Categories = () => {
  const { products } = useContext(DataStoreContext);
  const duplicateCategories = products.map((i) => i.categories);
  const categories = duplicateCategories.filter(
    (v, i) => duplicateCategories.indexOf(v) === i
  );

  return (
    <Box maxW={"container.xl"} mx={"auto"} px={4} mt={[20, 8]}>
      <Box>
        <chakra.h2
          mb={4}
          fontSize={{
            base: "2xl",
            md: "4xl",
          }}
          fontWeight="semibold"
          letterSpacing="tight"
          textAlign={{
            base: "center",
            md: "left",
          }}
          color="gray.900"
          _dark={{
            color: "gray.400",
          }}
          lineHeight={{
            md: "shorter",
          }}
          textShadow="2px 0 currentcolor"
        >
          All Products Category
        </chakra.h2>
        <chakra.p
          mb={5}
          textAlign={{
            base: "center",
            sm: "left",
          }}
          color="gray.600"
          _dark={{
            color: "gray.400",
          }}
          fontSize={{
            md: "lg",
          }}
        >
          All recommanded products category for your, Buy Now
        </chakra.p>
      </Box>

      <SimpleGrid
        alignItems="center"
        justifyContent="center"
        columns={[1, 2, 3]}
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
                    bg: "green.700",
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
    </Box>
  );
};

export default Categories;
