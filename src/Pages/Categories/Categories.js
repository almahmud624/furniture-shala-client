import {
  Box,
  Heading,
  SimpleGrid,
  chakra,
  Image,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    categoryName: "restaurent",
    categoryImg: "https://i.ibb.co/cDR15bZ/image.png",
    color: "#907857",
  },
  {
    categoryName: "home",
    categoryImg: "https://i.ibb.co/XDHQV18/image.png",
    color: "#910B0C",
  },
  {
    categoryName: "office",
    categoryImg:
      "https://i.ibb.co/m0MvtqK/loft-home-office-interior-design-1.jpg",
    color: "#7A3B1B",
  },
];
const Categories = () => {
  return (
    <Box mx={"auto"} my={[30, 20, 8]}>
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

      <Flex
        justify={"center"}
        align={"center"}
        gap={{ base: 10, md: 20 }}
        py={8}
        flexDir={{ base: "column", md: "row" }}
      >
        {categories?.map((category) => (
          <Box role="group" key={Math.random()}>
            <Box
              px={5}
              pt={5}
              bg={"gray.900"}
              rounded={"lg"}
              boxShadow={"0 0 10px 3px rgba(0,0,0,0.35)"}
              _groupHover={{ boxShadow: "none" }}
              transition={"all .3s"}
            >
              <Link to={`/categories/${category?.categoryName}`}>
                <Box h={52}>
                  <Image
                    src={category?.categoryImg}
                    alt="Green double couch with wooden legs"
                    transition={".3s"}
                    className="category-img"
                    rounded={"lg"}
                    w={"full"}
                    h={"full"}
                    objectFit={"cover"}
                    _groupHover={{ transform: "translateY(5px)" }}
                  />
                </Box>
                <Heading
                  as={"h3"}
                  fontSize={"xl"}
                  textTransform={"capitalize"}
                  textAlign={"center"}
                  py={5}
                  cursor={"pointer"}
                  bg="transparent"
                  transition={".3s"}
                  fontWeight={"semibold"}
                  color={category.color}
                >
                  {category?.categoryName}
                </Heading>
              </Link>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Categories;
