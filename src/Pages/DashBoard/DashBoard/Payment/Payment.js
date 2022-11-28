import React, { useEffect, useState } from "react";
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
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./Payment.css";
import axios from "axios";

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

  // payment intents state
  const [clientSecret, setClientSecret] = useState("");

  // payment confirm traxnId state
  const [transectionId, setTransectionId] = useState("");

  const onSubmit = async (orderedItem) => {
    // getting stripe card data
    if (!stripe || !elements) {
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
      toast({
        title: `${error.message}`,
        position: "top",
        isClosable: true,
        status: "error",
      });
      return;
    } else {
    }
    // confirm stripe card payment
    const { paymentIntent, confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: orderedItem?.buyerName,
            email: orderedItem?.buyerEmail,
            orderId: orderedItem?._id,
          },
        },
      }
    );

    if (confirmError) {
      toast({
        title: `${confirmError}`,
        position: "top",
        isClosable: true,
        status: "error",
      });
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransectionId(paymentIntent?.id);
      // send payment details on database
      const paymentInfo = {
        email,
        productPrice,
        orderId: order?._id,
        productId: order?.productId,
        txnId: paymentIntent?.id,
      };
      const { data } = await axios.post(
        "http://localhost:4000/payments",
        paymentInfo
      );
      if (data.acknowledged) {
        toast({
          title: `${"Payment Successful"}`,
          position: "top",
          isClosable: true,
          status: "success",
        });
      }
    }
  };
  // stripe payment intents
  useEffect(() => {
    if (productPrice === 0) {
      return;
    }
    fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: parseInt(productPrice) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [productPrice]);

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
                    disabled={transectionId}
                  >
                    {transectionId ? (
                      "Payment Successful"
                    ) : (
                      <>Pay ${productPrice}</>
                    )}
                  </Button>
                </Stack>
              </Stack>
            </Box>
            <Box
              bg={"green.700"}
              p={3}
              borderRadius={7}
              fontWeight="semibold"
              textAlign={"center"}
            >
              {transectionId ? (
                <Text>
                  <Text color={"gray.800"} display={"inline-block"}>
                    Your TxN No:
                  </Text>{" "}
                  {transectionId}
                </Text>
              ) : (
                <Text>
                  <Text color={"gray.800"} display={"inline-block"}>
                    Test Card No:
                  </Text>{" "}
                  378282246310005
                </Text>
              )}
            </Box>
          </Stack>
        </Box>
      </form>
    </div>
  );
};

export default Payment;
