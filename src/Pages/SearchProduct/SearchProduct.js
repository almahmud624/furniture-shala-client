import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InfiniteScrollProduct from "../../Component/InfiniteScrollProduct/InfiniteScrollProduct";
const SearchProduct = () => {
  const [searchParams] = useSearchParams();
  const paramQueryText = searchParams.get("_q");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(
    paramQueryText ? paramQueryText : ""
  );
  // using debounce handler making some delay for set price range in query path
  const debounceHandler = (fn, delay) => {
    let timeOutId;
    return (...args) => {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        fn(...args);
      }, [delay]);
    };
  };

  const doQuery = (value) => {
    setSearchQuery(value);
    generateSearchQuery(value);
  };

  const handleSearchProduct = debounceHandler(doQuery, 1000);

  // generate search query
  const generateSearchQuery = (value) => {
    const params = new URLSearchParams({
      _q: value,
    });
    const url = `/search?${params}`;
    navigate(url);
  };
  return (
    <Box py={20} maxWidth={"90%"} margin={"auto"}>
      <Heading>Search Product...</Heading>
      <HStack align={"center"} mt={5}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Enter search furniture name..."
            focusBorderColor="gray.700"
            _focus={{ borderWidth: "0" }}
            defaultValue={searchQuery}
            onChange={(e) => handleSearchProduct(e.target.value)}
          />
        </InputGroup>
        <Button variant={"unstyled"}>
          <Link to={"/"}>Cancel</Link>
        </Button>
      </HStack>
      <InfiniteScrollProduct searchQuery={searchQuery} />
    </Box>
  );
};

export default SearchProduct;
