import { Heading, Flex } from "@chakra-ui/react";
import CustomGradientBtn from "../CustomGradientBtn";

export default function NotFound({ message, buttonText, link, hideBtn }) {
  return (
    <Flex
      flexDir={"column"}
      align={"center"}
      justify={"center"}
      textAlign="center"
      py={10}
      px={6}
      h={"96"}
      gap={7}
    >
      <Heading fontWeight={"semibold"} size={"lg"} mt={3} mb={2}>
        {message} Not Found
      </Heading>

      <CustomGradientBtn size={"sm"} link={link} display={hideBtn}>
        {buttonText}
      </CustomGradientBtn>
    </Flex>
  );
}
