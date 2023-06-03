import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BiSupport, BiTrophy } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";

const features = [
  { title: "Customer Support", subtitle: "Need Assistance?", icon: BiSupport },
  {
    title: "Free Shipping",
    subtitle: "When ordering over $100",
    icon: FaShippingFast,
  },
  {
    title: "Secure Payment",
    subtitle: "100% Secure Online Payment",
    icon: RiSecurePaymentLine,
  },
  {
    title: "Best Quality",
    subtitle: "Original Product Guarenteed",
    icon: BiTrophy,
  },
];

const SiteFeature = () => {
  return (
    <Box mt={20}>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "1fr",
          lg: "repeat(4,1fr)",
          "2xl": "repeat(4,1fr)",
        }}
        borderTopWidth={1}
        borderBottomWidth={1}
        borderBottomColor={"red.900"}
        borderTopColor={"red.900"}
        py={10}
        gap={7}
        px={5}
      >
        {features?.map(({ title, subtitle, icon }) => (
          <GridItem
            key={Math.random()}
            borderRightWidth={{ md: 0, lg: 1 }}
            borderRightColor={"red.900"}
            _last={{ borderWidth: "0" }}
            role="group"
          >
            <HStack gap={2}>
              <Box>
                <Icon as={icon} fontSize={"4xl"} color={"red.500"} />
              </Box>
              <Box>
                <Heading
                  size={"md"}
                  fontWeight={"semibold"}
                  _groupHover={{ color: "red.500" }}
                  transition={"all"}
                  transitionDuration={".3s"}
                >
                  {title}
                </Heading>
                <Text>{subtitle}</Text>
              </Box>
            </HStack>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default SiteFeature;
