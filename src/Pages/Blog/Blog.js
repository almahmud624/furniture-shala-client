import React, { useState } from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  useColorModeValue,
  Grid,
  HStack,
  Flex,
} from "@chakra-ui/react";
import ReadMoreReadLess from "../../Component/ReadMoreReadLess";

import data from "./blogDB.json";
import BlogCard from "../../Component/BlogCard/BlogCard";
import useDynamicTitle from "../../Hooks/useDynamicTitle";
const Blog = () => {
  useDynamicTitle("Blog");
  const [selectedBlog, setSelectedBlog] = useState(data[0]);
  function handleBlog(value) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setSelectedBlog(value);
  }

  return (
    <Flex flexDir={"column"} maxW={"90%"} py="12" mx={"auto"}>
      <Box
        display="flex"
        gap={{ base: 0, md: 7 }}
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
        mb={{ base: 40, md: 20, lg: "10" }}
      >
        <Box
          mb={"10"}
          display="flex"
          position="relative"
          alignItems="center"
          w={{ base: "full", md: "45%" }}
          h={{ base: "full", md: "96" }}
        >
          <Box
            width={"full"}
            h={"full"}
            border={"1px solid #2D3748"}
            rounded="md"
            boxShadow={"0px 0px 14px 0px rgba(0,0,0,0.45) "}
            p={2}
          >
            <Image
              borderRadius="sm"
              w={"full"}
              h={"full"}
              src={selectedBlog?.thumbnail}
              alt={selectedBlog?.title}
              objectFit="cover"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="baseline"
        >
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            <Heading>{selectedBlog?.title}</Heading>
          </Link>

          <HStack align={"center"} justify={"space-between"} my={3}>
            <Text as="p" fontSize="md" color={"gray.400"}>
              {selectedBlog?.published_date}
            </Text>
            <Text as="p" fontSize="md" color={"gray.400"}>
              {selectedBlog?.read_time}
            </Text>
          </HStack>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
          >
            <ReadMoreReadLess limit={600} boxHeight={64}>
              {selectedBlog?.description}
            </ReadMoreReadLess>
          </Text>
        </Box>
      </Box>

      <Box mt={{ base: 40, md: 40, lg: "10" }}>
        <Heading>Latest Blog</Heading>
        <Divider marginTop="5" />
        <Grid
          marginTop="5"
          gap={5}
          templateColumns={{
            base: "1fr",
            md: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
          }}
        >
          {data?.map((item) => (
            <BlogCard item={item} key={item?.title} handleBlog={handleBlog} />
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Blog;
