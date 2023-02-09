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
  const { colorMode, toggleColorMode } = useColorMode("dark");
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
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Stack spacing={{ base: "6", md: "8" }} align="start">
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
                  <Link
                    px={2}
                    py={1}
                    rounded={"md"}
                    _hover={{
                      textDecoration: "none",
                      bg: ("gray.200", "gray.700"),
                    }}
                    to="/login"
                  >
                    Login
                  </Link>
                  <Popover>
                    <PopoverTrigger>
                      <Button>Direct Login</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>
                        Login As Admin or Seller or User!
                      </PopoverHeader>
                      <PopoverBody>
                        <HStack>
                          <Button
                            size="sm"
                            bg={"green.600"}
                            color={"white"}
                            _hover={{
                              bg: "green.700",
                            }}
                            type="submit"
                            onClick={() => handleDirctLogin("admin")}
                          >
                            Admin
                          </Button>
                          <Button
                            size="sm"
                            bg={"green.600"}
                            color={"white"}
                            _hover={{
                              bg: "green.700",
                            }}
                            type="submit"
                            onClick={() => handleDirctLogin("user")}
                          >
                            User
                          </Button>
                          <Button
                            size="sm"
                            bg={"green.600"}
                            color={"white"}
                            _hover={{
                              bg: "green.700",
                            }}
                            type="submit"
                            onClick={() => handleDirctLogin("seller")}
                          >
                            Seller
                          </Button>
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
