import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import svgCurve from "../../Assets/svg-curve.svg";

const PageHeader = ({ pageTag, title, children, tagStyle, headerStyle }) => {
  return (
    <>
      <Box>
        <VStack pos={"relative"} sx={tagStyle}>
          <Text
            as={"span"}
            fontWeight={"semibold"}
            color={"gray.600"}
            _dark={{ color: "gray.300" }}
            pos={"relative"}
          >
            <Image src={svgCurve} pos={"absolute"} top={5} />
            {pageTag}
          </Text>
        </VStack>
        <Heading
          fontWeight={700}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
          my={5}
          sx={headerStyle}
        >
          {title}
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          {children}
        </Text>
      </Box>
    </>
  );
};

export default PageHeader;
