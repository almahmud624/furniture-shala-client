import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button, Center, Stack, Text, useToast } from "@chakra-ui/react";
import { AuthContext } from "../../Context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuthToken } from "../../Utilities/JwtApi";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((data) => {
        // store user data on server
        try {
          axios
            .post("http://localhost:4000/user", {
              name: data.user.displayName,
              email: data.user.email,
              role: "user",
            })
            .then((res) => {});
        } catch (error) {
          console.log(error);
        }
        setAuthToken(data.user);
        toast({
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
    <div>
      <Center p={8}>
        <Stack spacing={2} align={"center"} maxW={"md"} w={"full"}>
          <Button w={"full"} colorScheme={"facebook"} leftIcon={<FaFacebook />}>
            <Center>
              <Text>Continue with Facebook</Text>
            </Center>
          </Button>

          <Button
            w={"full"}
            variant={"outline"}
            onClick={() => handleGoogleSignIn()}
            leftIcon={<FcGoogle />}
          >
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
        </Stack>
      </Center>
    </div>
  );
};

export default SocialLogin;
