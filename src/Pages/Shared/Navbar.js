import React, { useContext, useState } from "react";
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
  Text,
  Image,
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
import logo from "../../Assets/logo.png";
import FeaturesMenu from "../../Component/FeaturesMenu/FeaturesMenu";

const Navbar = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const linkItems = (
    <>
      <Stack spacing={{ base: "6", md: "8" }} align="start">
        <Link to="/">
          {" "}
          <Text
            display={{ sm: "flex", md: "none" }}
            alignItems={"center"}
            fontSize={"xl"}
            fontWeight={"bold"}
            color={"green.600"}
          >
            Furniture
            <Box
              h={8}
              w={8}
              style={{ filter: "contrast(80%)" }}
              display={"inline-block"}
              mx={1}
            >
              <Image src={logo} h={"full"} w={"full"}></Image>
            </Box>
            Shala
          </Text>
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
        onMouseOver={() => setShowFeaturesMenu(true)}
      >
        Features
      </Link>
    </>
  );

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={["sm", "md"]}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {linkItems}
            </HStack>
            {/* <Stack
              spacing={{ base: "6", md: "8" }}
              align="start"
              display={{ base: "none", md: "flex" }}
            >
              <Link to="/">
                {" "}
                <Text
                  display={{ sm: "none", md: "flex" }}
                  alignItems={"center"}
                  fontSize={"xl"}
                  fontWeight={"bold"}
                  color={"green.600"}
                >
                  Furniture
                  <Box
                    h={8}
                    w={8}
                    style={{ filter: "contrast(80%)" }}
                    display={"inline-block"}
                    mx={1}
                  >
                    <Image src={logo} h={"full"} w={"full"}></Image>
                  </Box>
                  Shala
                </Text>
              </Link>
            </Stack> */}
          </HStack>
          <Stack
            spacing={{ base: "6", md: "8" }}
            align="start"
            display={{ base: "none", md: "flex" }}
          >
            <Link to="/">
              {" "}
              <Text
                display={{ sm: "none", md: "flex" }}
                alignItems={"center"}
                fontSize={"xl"}
                fontWeight={"bold"}
                color={"green.600"}
              >
                Furniture
                <Box
                  h={8}
                  w={8}
                  style={{ filter: "contrast(80%)" }}
                  display={"inline-block"}
                  mx={1}
                >
                  <Image src={logo} h={"full"} w={"full"}></Image>
                </Box>
                Shala
              </Text>
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
                    />
                  )}
                </MenuButton>
                <MenuList>
                  <MenuItem>{user?.displayName}</MenuItem>
                  <MenuItem>Profile</MenuItem>
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
                    borderColor={"green.500"}
                    rounded={"sm"}
                    bg={"green.700"}
                    _hover={{
                      textDecoration: "none",
                      bg: "transparent",
                      color: "gray.700",
                      _dark: {
                        color: "#fff",
                      },
                    }}
                    color={"#fff"}
                    size={["sm", "md"]}
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
