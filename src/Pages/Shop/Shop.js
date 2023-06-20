import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import ShopProduct from "../../Pages/Shop/sections/ShopProduct/ShopProduct";
import ShopSidebar from "../../Pages/Shop/sections/ShopSidebar/ShopSidebar";

export default function Shop() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{ base: 0, md: 80 }}
        p={{ base: 0, md: "4" }}
        py={{ base: 6, md: "4" }}
        mt={2}
      >
        <ShopProduct onOpen={onOpen} />
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      w={{ base: "full", md: 72 }}
      pos="absolute"
      h="full"
      {...rest}
      top={{ base: 7, md: "24" }}
      p={{ base: 5, md: 0 }}
    >
      <ShopSidebar />
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
