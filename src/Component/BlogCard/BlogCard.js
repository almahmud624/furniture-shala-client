import {
  Box,
  Button,
  GridItem,
  HStack,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";

export default function BlogCard({ item, handleBlog }) {
  const { title, description, thumbnail, published_date, read_time } =
    item || {};
  return (
    <>
      <GridItem width={"full"} bg={"gray.900"} p={4}>
        <Box w="100%" color={"gray.200"}>
          <Heading fontSize="2xl" fontWeight={"semibold"} mb="5">
            <Link
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              onClick={() => handleBlog(item)}
            >
              {title}
            </Link>
          </Heading>
          <Box borderRadius="sm" overflow="hidden" w={"full"} h={"52"}>
            <Link
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              onClick={() => handleBlog(item)}
            >
              <Image
                transform="scale(1.0)"
                src={thumbnail}
                alt="some text"
                objectFit="cover"
                width="100%"
                h={"full"}
                transition="0.3s ease-in-out"
                _hover={{
                  transform: "scale(1.05)",
                }}
              />
            </Link>
          </Box>
          <HStack align={"center"} justify={"space-between"} mt={4}>
            <Text as="p" fontSize="md" color={"gray.400"}>
              {published_date}
            </Text>
            <Text as="p" fontSize="md" color={"gray.400"}>
              {read_time}
            </Text>
          </HStack>
          <Text as="p" fontSize="md" marginTop="2">
            {description?.slice(0, 150)}...
          </Text>

          <Button
            color={"primary"}
            variant={"unstyled"}
            onClick={() => handleBlog(item)}
          >
            Read More
          </Button>
        </Box>
      </GridItem>
    </>
  );
}
