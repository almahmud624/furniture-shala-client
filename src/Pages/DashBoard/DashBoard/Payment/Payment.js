import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  useToast,
  NumberInputField,
  NumberInput,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./Payment.css";

const Payment = () => {
  const order = useLoaderData();
  const { productName, productPrice, name, email } = order;
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();
  const toast = useToast();

  // stripe card element
  const stripe = useStripe();
  const elements = useElements();

  async function onSubmit(payments) {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
    } else {
      console.log(paymentMethod);
    }

    console.log(card, order);
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          // minH={"100vh"}
          w={"xl"}
          mx={"auto"}
          //   bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} py={12} px={6}>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <Box>
                  <FormControl>
                    <FormLabel>Product Name</FormLabel>
                    <Input
                      id="productName"
                      type="text"
                      {...register("productName", {
                        required: "This is required",
                      })}
                      defaultValue={productName}
                      readOnly
                      focusBorderColor="teal.400"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel>Product Price</FormLabel>

                    <NumberInput
                      w={"full"}
                      defaultValue={`${productPrice}`}
                      readOnly
                    >
                      <NumberInputField {...register("productPrice")} />
                    </NumberInput>
                  </FormControl>
                </Box>
                <Box>
                  <Stack direction={["column", "row"]}>
                    <FormControl>
                      <FormLabel>Your Name</FormLabel>
                      <Input
                        id="name"
                        type="text"
                        {...register("buyerName", {
                          required: "This is required",
                        })}
                        defaultValue={name}
                        placeholder=""
                        readOnly
                      />
                    </FormControl>
                  </Stack>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your Email"
                      {...register("buyerEmail")}
                      defaultValue={email}
                      readOnly
                    />
                  </FormControl>
                </Box>
                <FormControl>
                  <CardElement
                    className="p-3"
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#B3C5EF",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    mt={4}
                    colorScheme="green"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Pay ${productPrice}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </form>
    </div>
  );
};

export default Payment;
