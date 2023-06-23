import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import ShopProduct from "../../Pages/Shop/sections/ShopProduct/ShopProduct";
import ShopSidebar from "../../Pages/Shop/sections/ShopSidebar/ShopSidebar";
import { useState } from "react";
import useDynamicTitle from "../../Hooks/useDynamicTitle";

export default function Shop() {
  useDynamicTitle("Shop | Choose your desire");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productsCount, setProductsCount] = useState();
  return (
    <Box maxW={"90%"} mx={"auto"}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} productsCount={productsCount} />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{ base: 0, md: 80 }}
        p={{ base: 0, md: "4" }}
        py={{ base: 6, md: "4" }}
        mt={2}
      >
        <ShopProduct onOpen={onOpen} setProductsCount={setProductsCount} />
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, productsCount, ...rest }) => {
  return (
    <Box
      w={{ base: "full", md: 72 }}
      pos="absolute"
      h="full"
      {...rest}
      top={{ base: 7, md: "24" }}
      p={{ base: 5, md: 0 }}
    >
      <ShopSidebar productsCount={productsCount} />
      <Button
        mt={7}
        w={"full"}
        display={{ base: "block", md: "none" }}
        onClick={onClose}
      >
        Confirm
      </Button>
    </Box>
  );
};
