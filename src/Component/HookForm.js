import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  FormHelperText,
  useToast,
  Container,
  RadioGroup,
  Radio,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { DataStoreContext } from "../Context/DataProvider";

export default function HookForm() {
  const { setFormData } = useContext(DataStoreContext);
  const toast = useToast();
  const toastIdRef = useRef();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    setFormData(values);

    return new Promise((resolve) => {
      setTimeout(() => {
        toastIdRef.current = toast({
          title: `Data Submitted`,
          position: "top",
          isClosable: true,
        });
        resolve();
      }, 3000);
    });
  }

  return (
    <Container maxW="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">First name</FormLabel>
          <Input
            id="name"
            placeholder="name"
            {...register("name", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Your Email"
            {...register("email", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl as="fieldset">
          <FormLabel as="legend">Favorite Naruto Character</FormLabel>
          <RadioGroup
          // defaultValue="Itachi"
          >
            <HStack spacing="24px">
              <Radio
                value="Sasuke"
                {...register("role", {
                  required: "This is required",
                })}
              >
                Sasuke
              </Radio>
              <Radio
                value="Nagato"
                {...register("role", {
                  required: "This is required",
                })}
              >
                Nagato
              </Radio>
            </HStack>
          </RadioGroup>
          <FormHelperText>Select only if you're a fan.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Old Amount</FormLabel>
          <NumberInput max={50} min={10}>
            <NumberInputField
              {...register("old-price", {
                required: "This is required",
              })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>New Amount</FormLabel>
          <NumberInput max={50} min={10}>
            <NumberInputField
              {...register("new-price", {
                required: "This is required",
              })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Select Category"
            {...register("categories", {
              required: "This is required",
            })}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </FormControl>
        <Button
          mt={4}
          colorScheme="green"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
