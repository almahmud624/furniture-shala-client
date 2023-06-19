import { useForm } from "react-hook-form";
import {
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
  InputRightAddon,
  Box,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import moment from "moment";
import axios from "axios";
import { calculateDiscountAmount } from "../Utilities/calculateDiscountAmount";
import ViewOnlyMode from "./ViewOnlyMode/ViewOnlyMode";

export default function OrderForm({
  user,
  productInfo,
  onClose,
  setIsOrder,
  discount,
  coupon,
  setCoupon,
}) {
  const toast = useToast();
  const toastIdRef = useRef();
  const [couponInput, setCouponInput] = useState();
  const [amount, setAmount] = useState(productInfo?.newPrice);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(order) {
    order.productId = productInfo?._id;
    order.orderdAt = moment().format("ll");
    order.productPrice = amount;

    try {
      const { data } = await axios.post(
        "https://furniture-shala-server.vercel.app/orders",
        order
      );
      if (data.acknowledged === true) {
        toastIdRef.current = toast({
          title: `Order Successful, Check My Orders!`,
          position: "top",
          isClosable: true,
        });
        onClose();
        setIsOrder(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCouponDiscount = () => {
    if (couponInput === coupon?.couponText) {
      const calculatedAmount = calculateDiscountAmount(
        parseInt(coupon?.couponPercentage),
        productInfo
      );
      setAmount(calculatedAmount);
      setCoupon(null);
      toastIdRef.current = toast({
        title: `Coupon Applied`,
        position: "top",
        isClosable: true,
        status: "success",
      });
    } else {
      toastIdRef.current = toast({
        title: `Wrong Coupon`,
        position: "top",
        isClosable: true,
        status: "error",
      });
    }
  };

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
                value={
                  discount
                    ? calculateDiscountAmount(discount, productInfo)
                    : amount
                }
                readOnly
              >
                <NumberInputField
                  {...register("productPrice")}
                  placeholder="0000"
                  roundedBottomLeft={0}
                  roundedTopLeft={0}
                  rounded={discount && 0}
                />
              </NumberInput>
              {discount && (
                <InputRightAddon
                  bg="gray.50"
                  _dark={{
                    bg: "gray.800",
                  }}
                  color="gray.500"
                  rounded="md"
                >
                  11% Discount Applied
                </InputRightAddon>
              )}
            </InputGroup>
          </FormControl>
          {coupon && (
            <FormControl>
              <InputGroup>
                <Input
                  type="text"
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <InputRightAddon
                  children="Apply Coupon"
                  cursor={"pointer"}
                  onClick={handleCouponDiscount}
                />
              </InputGroup>
            </FormControl>
          )}
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
          <Box pos={"relative"} w={"fit-content"}>
            <ViewOnlyMode />
            <Button
              mt={4}
              colorScheme="green"
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </form>
    </Container>
  );
}
