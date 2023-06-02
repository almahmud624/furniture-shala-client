import { Box, Heading, SimpleGrid, chakra, Image } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      categoryName: "restaurent",
      categoryImg: "https://i.ibb.co/cDR15bZ/image.png",
    },
    {
      categoryName: "home",
      categoryImg: "https://i.ibb.co/XDHQV18/image.png",
    },
    {
      categoryName: "office",
      categoryImg: "https://i.ibb.co/yg7hKgB/image.png",
    },
  ];

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

      <SimpleGrid placeItems={"center"} columns={[1, 2, 3]} spacing={20} py={8}>
        {categories?.map((category) => (
          <Box role="group" key={Math.random()}>
            <SimpleGrid placeItems={"center"}>
              <Link to={`/categories/${category?.categoryName}`}>
                <Box>
                  <Image
                    src={category?.categoryImg}
                    alt="Green double couch with wooden legs"
                    borderRadius="73% 27% 79% 21% / 29% 72% 28% 71% "
                    transition={".3s"}
                    // _hover={{
                    //   borderRadius: "5px",
                    // }}
                    // _groupHover={{
                    //   background: "red",
                    // }}
                    className="category-img"
                    _hover={{
                      borderRadius: "5px 5px 0px 0px",
                    }}
                    _groupHover={{
                      borderRadius: "5px 5px 0px 0px",
                    }}
                  />
                </Box>
                <Heading
                  as={"h3"}
                  fontSize={"xl"}
                  style={{
                    textTransform: "capitalize",
                    // transform: "rotate(-5deg)",
                  }}
                  transform="rotate(-5deg)"
                  textAlign={"center"}
                  py={5}
                  cursor={"pointer"}
                  bg="transparent"
                  transition={".3s"}
                  border={"1px solid #276749"}
                  borderRadius="73% 27% 79% 21% / 29% 72% 28% 71% "
                  _hover={{
                    transform: "rotate(0deg)",
                    borderRadius: "0px 0px 5px 5px",
                    borderTop: "none",
                  }}
                  _groupHover={{
                    transform: "rotate(0deg)",
                    borderRadius: "0px 0px 5px 5px",
                    borderTop: "none",
                  }}
                  fontWeight={"normal"}
                >
                  {category?.categoryName} Furniture
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
