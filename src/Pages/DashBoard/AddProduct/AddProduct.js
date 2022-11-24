import { RepeatIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Text,
  useColorModeValue,
  useToast,
  NumberInputField,
  NumberInput,
  VisuallyHidden,
  Icon,
  chakra,
  Textarea,
  Select,
  Image,
} from "@chakra-ui/react";
import { useRef, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { DataStoreContext } from "../../../Context/DataProvider";

const AddProduct = () => {
  const [setSellerProducts] = useContext(DataStoreContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();
  const toastIdRef = useRef();

  // image preview state
  const [imgPreview, setImgPreview] = useState(null);
  console.log(imgPreview);

  function onSubmit(values) {
    values.productImg = imgPreview?.imgSrc;
    console.log(values);
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
  const handleImgPreview = (e) => {
    e.preventDefault();
    const imgFile = e.target.files[0];
    const imgSrc = URL.createObjectURL(imgFile);
    setImgPreview({ imgSrc, imgFile });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        // minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} py={12} px={6}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <FormControl isRequired>
                  <FormLabel>Product Image</FormLabel>
                  <Flex
                    mt={1}
                    justify="center"
                    px={6}
                    pt={5}
                    pb={6}
                    borderWidth={2}
                    _dark={{
                      color: "gray.500",
                    }}
                    borderStyle="dashed"
                    rounded="md"
                  >
                    {imgPreview ? (
                      <>
                        <Box boxSize="44">
                          <Image
                            src={imgPreview?.imgSrc}
                            w={"full"}
                            h={"full"}
                            objectFit="cover"
                            alt="Dan Abramov"
                          />
                        </Box>
                        <RepeatIcon
                          ml={"3"}
                          fontSize="2xl"
                          cursor={"pointer"}
                          onClick={() => setImgPreview(null)}
                        />
                      </>
                    ) : (
                      <Stack spacing={1} textAlign="center">
                        <Flex
                          fontSize="sm"
                          color="gray.600"
                          _dark={{
                            color: "gray.400",
                          }}
                          alignItems="center"
                          flexDir={"column"}
                        >
                          <Stack>
                            <chakra.label
                              htmlFor="file-upload"
                              cursor="pointer"
                              rounded="md"
                              fontSize="md"
                              color="brand.600"
                              _dark={{
                                color: "brand.200",
                              }}
                              pos="relative"
                              _hover={{
                                color: "brand.400",
                                _dark: {
                                  color: "brand.300",
                                },
                              }}
                            >
                              <Icon
                                mx="auto"
                                boxSize={12}
                                color="gray.400"
                                _dark={{
                                  color: "gray.500",
                                }}
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </Icon>

                              <VisuallyHidden>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  onChange={handleImgPreview}
                                />
                              </VisuallyHidden>
                            </chakra.label>
                          </Stack>
                          <Text pl={1}>
                            <span>Upload a Photo</span>
                          </Text>
                        </Flex>
                        <Text
                          fontSize="xs"
                          color="gray.500"
                          _dark={{
                            color: "gray.50",
                          }}
                        >
                          PNG, JPG, JPEG and Size 300x300 (as possible)
                        </Text>
                      </Stack>
                    )}
                  </Flex>
                </FormControl>
              </HStack>
              <HStack>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Product Name</FormLabel>
                    <Input
                      id="productName"
                      type="text"
                      {...register("productName", {
                        required: "This is required",
                      })}
                      placeholder="ex. chest of drawers"
                    />
                    {/* <FormErrorMessage>
                      {errors.productName && errors.productName.message}
                    </FormErrorMessage> */}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Old Amount</FormLabel>
                    <NumberInput max={50} min={10}>
                      <NumberInputField
                        {...register("oldPrice", {
                          required: "This is required",
                        })}
                        placeholder="0000"
                      />
                      {/* <FormErrorMessage>
                        {errors.oldPrice && errors.oldPrice.message}
                      </FormErrorMessage> */}
                    </NumberInput>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>New Amount</FormLabel>
                    <NumberInput max={50} min={10}>
                      <NumberInputField
                        {...register("newPrice", {
                          required: "This is required",
                        })}
                        placeholder="0000"
                      />
                      {/* <FormErrorMessage>
                        {errors.oldPrice && errors.oldPrice.message}
                      </FormErrorMessage> */}
                    </NumberInput>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Product Description</FormLabel>
                <Textarea
                  isRequired
                  placeholder="Description should be relevent to product..."
                  {...register("description", {
                    required: "This is required",
                  })}
                />
              </FormControl>
              <Box>
                <HStack>
                  <FormControl isRequired>
                    <FormLabel>Product Condition</FormLabel>
                    <Select placeholder="Excellent">
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Year of purchase</FormLabel>
                    <NumberInput>
                      <NumberInputField
                        {...register("priceYear", {
                          required: "This is required",
                        })}
                        placeholder="23/12/2018"
                      />
                      {/* <FormErrorMessage>
                        {errors.oldPrice && errors.oldPrice.message}
                      </FormErrorMessage> */}
                    </NumberInput>
                  </FormControl>
                </HStack>
              </Box>
              <Box>
                <HStack>
                  <FormControl isRequired>
                    <FormLabel>Location</FormLabel>
                    <Input
                      id="location"
                      type="text"
                      {...register("location", {
                        required: "Product Pick Up Location...",
                      })}
                      placeholder="Where to pick..."
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Your Phone</FormLabel>
                    <NumberInput>
                      <NumberInputField
                        {...register("phone", {
                          required: "This is required",
                        })}
                        placeholder="+880 1700000000"
                      />
                      {/* <FormErrorMessage>
                        {errors.oldPrice && errors.oldPrice.message}
                      </FormErrorMessage> */}
                    </NumberInput>
                  </FormControl>
                </HStack>
              </Box>

              <Stack spacing={10} pt={2}>
                <Button
                  mt={4}
                  colorScheme="green"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
};

export default AddProduct;
