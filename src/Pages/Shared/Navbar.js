import React, { useContext, useRef } from "react";
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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import logo from "../../Assets/logo.png";
import { setAuthToken } from "../../Utilities/JwtApi";

const Navbar = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const { userLogIn } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const toastIdRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
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
        to="/"
      >
        Home
      </Link>
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
        to="/blog"
      >
        Blog
      </Link>
    </>
  );

  const handleDirctLogin = (role) => {
    let email;
    let password = 123456;
    if (role === "admin") {
      email = "furnitureshala@gmail.com";
    } else if (role === "seller") {
      email = "seller@gmail.com";
    } else {
      email = "user@gmail.com";
    }
    const user = { email, password };
    userLogIn(email, password)
      .then((data) => {
        setAuthToken(user);
        toastIdRef.current = toast({
          title: `Login Successfull`,
          position: "top",
          isClosable: true,
          status: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast({
          title: `${error.code.split("/")[1].split("-").join(" ")}`,
          position: "top",
          isClosable: true,
          status: "error",
        });
      });
  };

  const RoleButton = ({ children }) => {
    return (
      <>
        <Button
          size="sm"
          bg={"transparent"}
          borderWidth={1}
          borderColor={"green.500"}
          color={"gray.700"}
          _dark={{ color: "#fff" }}
          _hover={{
            bg: "green.700",
            color: "#ffffff",
          }}
          borderRadius={2}
          type="submit"
          textTransform={"capitalize"}
          onClick={() => handleDirctLogin(children)}
        >
          {children}
        </Button>
      </>
    );
  };
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
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {linkItems}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} alignItems={"center"}>
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
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        bg={"transparent"}
                        borderWidth={1}
                        borderColor={"green.500"}
                        rounded={"sm"}
                        color={"green.500"}
                        _hover={{ color: "gray.700", _dark: { color: "#fff" } }}
                        size={["sm", "md"]}
                      >
                        Direct Login
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>
                        Login As Admin or Seller or User!
                      </PopoverHeader>
                      <PopoverBody>
                        <HStack>
                          <RoleButton>admin</RoleButton>
                          <RoleButton>user</RoleButton>
                          <RoleButton>seller</RoleButton>
                        </HStack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </HStack>
              )}
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
    </>
  );
};

export default Navbar;
