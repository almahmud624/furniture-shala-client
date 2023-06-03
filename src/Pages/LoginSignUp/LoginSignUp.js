import React, { useRef } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  RadioGroup,
  Radio,
  useToast,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import SocialLogin from "../SocialLogin/SocialLogin";
import { setAuthToken } from "../../Utilities/JwtApi";

const LoginSignUp = () => {
  const [state, setState] = useState("initial");
  const [searchParams] = useSearchParams();
  const queryRole = searchParams.get("role");
  const { createUser, updateUserProfile, userLogIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(queryRole ? false : true);
  const [role, setRole] = useState(queryRole ? queryRole : "user");
  const toast = useToast();
  const toastIdRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  function onSubmit(user) {
    setState("submitting");
    if (isLogin) {
      userLogIn(user?.email, user?.password)
        .then((data) => {
          setAuthToken(user);
          toastIdRef.current = toast({
            title: `Login Successful`,
            position: "top",
            isClosable: true,
            status: "success",
          });
          setState("success");
          navigate(from, { replace: true });
        })
        .catch((error) => {
          toast({
            title: `${error.code.split("/")[1].split("-").join(" ")}`,
            position: "top",
            isClosable: true,
            status: "error",
          });
          setState("error");
        });
    } else {
      createUser(user.email, user.password)
        .then((data) => {
          updateUserProfile({ displayName: user.name })
            .then((data) => {})
            .catch((error) => {
              toast({
                title: `${error.code.split("/")[1].split("-").join(" ")}`,
                position: "top",
                isClosable: true,
                status: "error",
              });
              setState("error");
            });
          // store user data on server
          try {
            axios
              .post("https://furniture-shala-server.vercel.app/user", {
                name: user.name,
                email: user.email,
                role: user.role,
              })
              .then((res) => {
                if (res.data.acknowledged === true) {
                  setAuthToken(user);
                  toastIdRef.current = toast({
                    title: `Registration Successful`,
                    position: "top",
                    isClosable: true,
                    status: "success",
                  });
                  setState("success");
                  navigate(from, { replace: true });
                }
              });
          } catch (error) {
            console.log(error);
            setState("error");
          }
        })
        .catch((error) => {
          toast({
            title: `${error.code}`,
            position: "top",
            isClosable: true,
            status: "error",
          });
          setState("error");
        });
    }
  }
  return (
    <div>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} w={"3xl"}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              {!isLogin ? "Registration" : "Login"}
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            {role === "seller" && (
              <Text
                color={"green.500"}
                textAlign={"center"}
                mt={"-6"}
                mb={2}
                fontWeight={"semibold"}
                fontSize={"xl"}
              >
                Join As Seller
              </Text>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                {!isLogin && (
                  <>
                    <FormControl id="name" isRequired>
                      <FormLabel>Your Name</FormLabel>
                      <Input
                        type="text"
                        {...register("name", {
                          required: "This is required",
                        })}
                        style={{ textTransform: "capitalize" }}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Choose Your Account</FormLabel>
                      <RadioGroup onChange={setRole} value={role}>
                        <Stack direction="row">
                          <Radio
                            value="user"
                            texttransform={"capitalize"}
                            {...register("role", {
                              required: "This is required",
                            })}
                            defaultChecked={role === "user"}
                          >
                            User account
                          </Radio>
                          <Radio
                            value="seller"
                            texttransform={"capitalize"}
                            {...register("role", {
                              required: "This is required",
                            })}
                            defaultChecked={role === "seller"}
                          >
                            Seller account
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                  </>
                )}

                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    {...register("email", {
                      required: "This is required",
                    })}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "This is required",
                      })}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    isLoading={isSubmitting}
                    size="lg"
                    bg={"green.600"}
                    color={"white"}
                    _hover={{
                      bg: "green.700",
                    }}
                    type="submit"
                    _loading={state === "submitting"}
                  >
                    {isLogin ? "Login" : "Register"}
                  </Button>
                </Stack>
                <SocialLogin />
                <Stack pt={6}>
                  {!isLogin ? (
                    <Text align={"center"}>
                      Already a user?{" "}
                      <Link color={"blue.400"} onClick={() => setIsLogin(true)}>
                        Login
                      </Link>
                    </Text>
                  ) : (
                    <Text align={"center"}>
                      You are new here?{" "}
                      <Link
                        color={"blue.400"}
                        onClick={() => setIsLogin(false)}
                      >
                        Create Account
                      </Link>
                    </Text>
                  )}
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};

export default LoginSignUp;
