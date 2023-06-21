import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const menus = [
  {
    title: "About us",
    items: [
      { itemTitle: "furniture shala", href: "/about-us" },
      { itemTitle: "sell with us", href: "/become-seller" },
    ],
  },
  {
    title: "offer",
    items: [
      { itemTitle: "flash sale", href: "/flashsale" },
      { itemTitle: "coupon", href: "/coupon" },
    ],
  },
  {
    title: "connect",
    items: [
      { itemTitle: "blog", href: "/blog" },
      { itemTitle: "contact", href: "/contact" },
      { itemTitle: "instagram", href: "/" },
      { itemTitle: "facebook", href: "/" },
    ],
  },
];

export default function FeaturesMenu({
  showFeaturesMenu,
  setShowFeaturesMenu,
}) {
  return (
    <Stack
      maxH={{ base: "full", md: "72" }}
      direction={{ base: "column", md: "row" }}
      pos={"absolute"}
      top={16}
      zIndex={showFeaturesMenu ? 50 : -1}
      bg={"gray.900"}
      opacity={showFeaturesMenu ? "1" : "0"}
      transition={"all"}
      transitionDuration={".5s"}
      onMouseLeave={() => setShowFeaturesMenu(false)}
      p={10}
      borderTopWidth={1}
      borderTopColor={"gray.700"}
      justify={"center"}
      w={"full"}
    >
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={{ base: "8", sm: "12", md: "16" }}
        w={{ base: "full", md: "60%" }}
      >
        {menus?.map(({ title, items }) => (
          <Menu
            key={title}
            heading={title}
            items={items}
            setShowFeaturesMenu={setShowFeaturesMenu}
          />
        ))}
      </Grid>
      <Flex
        flex={1}
        w={"full"}
        justify={"right"}
        display={{ base: "none", md: "inline-flex" }}
      >
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          rounded={"sm"}
          src={
            "https://img.freepik.com/premium-photo/business-team-meeting-connection-digital-technology-concept_53876-87854.jpg?w=996"
          }
        />
      </Flex>
    </Stack>
  );
}
const Menu = ({ heading, items, setShowFeaturesMenu }) => {
  return (
    <GridItem>
      <Heading
        textTransform={"capitalize"}
        mb={4}
        fontSize="2xl"
        fontWeight="600"
      >
        {heading}
      </Heading>
      <VStack align={"left"}>
        {items?.map(({ itemTitle, href }) => (
          <Text textTransform={"capitalize"} key={itemTitle}>
            <Link to={href} onClick={() => setShowFeaturesMenu(false)}>
              {itemTitle}
            </Link>
          </Text>
        ))}
      </VStack>
    </GridItem>
  );
};
