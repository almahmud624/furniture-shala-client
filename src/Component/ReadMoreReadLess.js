import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

const ReadMoreReadLess = ({ children, limit, boxHeight }) => {
  const [isExpandable, setIsExpandable] = useState(false);
  const text = children;
  const onToggle = () => {
    setIsExpandable((isExpandable) => !isExpandable);
  };
  // text length less than limit
  const isTextWrap = text?.length < limit;
  return (
    <>
      <Box
        id="scrollbar"
        overflowY={isExpandable && "scroll"}
        h={!isTextWrap && boxHeight}
      >
        <Text>
          {isExpandable ? text : `${text?.slice(0, limit)}`}
          {!isTextWrap && (
            <Text
              display={"inline-block"}
              fontWeight={"semibold"}
              variant={"unstyled"}
              onClick={onToggle}
              cursor={"pointer"}
              color={"teal.500"}
              ml={isExpandable && 1}
            >
              {isExpandable ? "Read Less" : "...Read More"}
            </Text>
          )}
        </Text>
      </Box>
    </>
  );
};

export default ReadMoreReadLess;
