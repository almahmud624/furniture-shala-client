import {
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { setAuthToken } from "../../Utilities/JwtApi";
import { useLocation, useNavigate } from "react-router-dom";

const DirectLogin = () => {
  const { userLogIn } = useContext(AuthContext);
  const toast = useToast();
  const toastIdRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
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
          title: `Login Successful`,
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
          <PopoverHeader>Login As Admin or Seller or User!</PopoverHeader>
          <PopoverBody>
            <HStack>
              <RoleButton>admin</RoleButton>
              <RoleButton>user</RoleButton>
              <RoleButton>seller</RoleButton>
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DirectLogin;
