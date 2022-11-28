import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  useToast,
  Container,
  InputLeftAddon,
  InputGroup,
  GridItem,
  NumberInputField,
  NumberInput,
  Stack,
} from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { DataStoreContext } from "../Context/DataProvider";
import moment from "moment";
import axios from "axios";

export default function OrderForm({ user, productInfo, onClose }) {
  const { setOrders, orders } = useContext(DataStoreContext);
  const toast = useToast();
  const toastIdRef = useRef();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(order) {
    order.productId = productInfo?._id;
    order.orderdAt = moment().format("ll");

    try {
      const { data } = await axios.post(
        "https://furniture-shala-server.vercel.app/orders",
        order
      );
      if (data.acknowledged === true) {
        toastIdRef.current = toast({
          title: `Order Successfull, Check My Orders!`,
          position: "top",
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container maxW="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5} py={4}>
          <FormControl>
            <FormLabel htmlFor="name">Product name</FormLabel>
            <Input
              id="productName"
              placeholder="productName"
              {...register("productName")}
              defaultValue={productInfo?.productName}
              readOnly
            />
          </FormControl>
          <FormControl>
            <FormLabel>Product Price</FormLabel>
            <InputGroup size="md">
              <InputLeftAddon
                bg="gray.50"
                _dark={{
                  bg: "gray.800",
                }}
                color="gray.500"
                rounded="md"
              >
                $
              </InputLeftAddon>
              <NumberInput
                w={"full"}
                defaultValue={Number(productInfo?.newPrice)}
                readOnly
              >
                <NumberInputField
                  {...register("productPrice")}
                  placeholder="0000"
                  roundedBottomLeft={0}
                  roundedTopLeft={0}
                />
              </NumberInput>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="name">Customar name</FormLabel>
            <Input
              id="name"
              placeholder="name"
              {...register("name")}
              defaultValue={user?.displayName}
              readOnly
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Your Email"
              {...register("email")}
              defaultValue={user?.email}
              readOnly
            />
          </FormControl>

          <FormControl as={GridItem} colSpan={[3, 2]} isRequired>
            <FormLabel>Your Phone</FormLabel>
            <InputGroup size="md">
              <InputLeftAddon
                bg="gray.50"
                _dark={{
                  bg: "gray.800",
                }}
                color="gray.500"
                rounded="md"
              >
                +880
              </InputLeftAddon>
              <Input
                type="tel"
                placeholder="1400000000"
                focusBorderColor="teal.400"
                rounded="md"
                {...register("phone")}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              id="location"
              type="text"
              {...register("location", {
                required: "This is required",
              })}
              placeholder="Product Pick Up Location..."
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme="green"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
