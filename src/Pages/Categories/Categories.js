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
          fontWeight="bold"
          textAlign={"left"}
          lineHeight={{
            md: "shorter",
          }}
        >
          All Products Category
        </chakra.h2>
        <chakra.p
          mb={5}
          textAlign={"left"}
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
                  bg="transparent"
                  border={"2px solid #1A202C"}
                  _dark={{
                    bg: "green.700",
                    _hover: {
                      bg: "transparent",
                      border: "2px solid #276749",
                    },
                  }}
                  borderRadius={"md"}
                  _hover={{
                    bg: "gray.900",
                    color: "#fff",
                  }}
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
