import React, { useContext, useRef, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Image,
  useOutsideClick,
  Text,
  AvatarBadge,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import logo2 from "../../Assets/logo2.png";
import FeaturesMenu from "../../Component/FeaturesMenu/FeaturesMenu";
import useAdminSellerCheck from "../../Hooks/useAdminSellerCheck";
import useCheckOnlineStatus from "../../Hooks/useCheckOnlineStatus";

const Navbar = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAdminSeller, role] = useAdminSellerCheck();
  const isOnline = useCheckOnlineStatus();
  const ref = useRef();
  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });
  const linkItems = (
    <>
      <Stack spacing={{ base: "6", md: "8" }} align="start">
        <Link to="/">
          <Box h={"full"} w={40} display={{ sm: "inline-block", md: "none" }}>
            <Image
              src={logo2}
              h={"full"}
              w={"full"}
              objectFit={"contain"}
            ></Image>
          </Box>
        </Link>
      </Stack>
      <Link
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
        to="/shop"
      >
        Shop
      </Link>

      {user?.uid && (
        <Link
          px={2}
          py={1}
          rounded={"md"}
          _hover={{
            textDecoration: "none",
            bg: ("gray.200", "gray.700"),
          }}
          to="/dashboard"
        >
          Dashboard
        </Link>
      )}
      <Link
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
        onMouseOver={() => {
          setShowFeaturesMenu(true);
          if (isOpen) {
            onClose();
          }
        }}
      >
        Features
      </Link>
    </>
  );

  const handleMenuToggle = () => {
    if (showFeaturesMenu) {
      setShowFeaturesMenu(false);
    }
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} ref={ref}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={["sm", "md"]}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={handleMenuToggle}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {linkItems}
            </HStack>
          </HStack>
          <Stack
            spacing={{ base: "6", md: "8" }}
            align="start"
            display={{ base: "none", md: "flex" }}
          >
            <Link to="/">
              <Box h={"full"} w={40} display={"inline-block"} mx={1}>
                <Image
                  src={logo2}
                  h={"full"}
                  w={"full"}
                  objectFit={"contain"}
                ></Image>
              </Box>
            </Link>
          </Stack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} alignItems={"center"}>
              <Link to={"/search"}>
                <Search2Icon />
              </Link>
              <Button variant={"ghost"} onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  {user?.uid && (
                    <Avatar
                      size={"sm"}
                      src={
                        user?.photoURL
                          ? user?.photoURL
                          : "https://smartkid.club/assets/images/default-user.png"
                      }
                    >
                      <AvatarBadge
                        boxSize="1.25em"
                        bg={isOnline ? "green.500" : "tomato"}
                      />
                    </Avatar>
                  )}
                </MenuButton>
                <MenuList zIndex={50}>
                  <MenuItem textTransform={"capitalize"}>
                    {user?.displayName}
                  </MenuItem>
                  {isAdminSeller && (
                    <MenuItem
                      bg={"gray.400"}
                      _dark={{ bg: "gray.800", color: "gray.200" }}
                    >
                      Logged in as{" "}
                      <Text as={"span"} textTransform={"capitalize"} ml={2}>
                        {role}
                      </Text>
                    </MenuItem>
                  )}
                  <MenuDivider />
                  <MenuItem onClick={() => userSignOut()}>Log Out</MenuItem>
                </MenuList>
              </Menu>
              {!user?.uid && (
                <HStack>
                  <Button
                    as={Link}
                    px={4}
                    py={1}
                    borderWidth={1}
                    borderColor={"primary"}
                    rounded={"sm"}
                    bg={"primary"}
                    _hover={{
                      textDecoration: "none",
                      bg: "transparent",
                      color: "gray.700",
                      _dark: {
                        color: "#fff",
                      },
                    }}
                    color={"#fff"}
                    size={"sm"}
                    to="/login"
                  >
                    Login
                  </Button>
                </HStack>
              )}
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {linkItems}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <FeaturesMenu
        setShowFeaturesMenu={setShowFeaturesMenu}
        showFeaturesMenu={showFeaturesMenu}
      />
    </>
  );
};

export default Navbar;
