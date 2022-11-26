import { RepeatIcon } from "@chakra-ui/icons";
import moment from "moment";
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
  InputLeftAddon,
  InputGroup,
  GridItem,
  Checkbox,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import axios from "axios";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();
  const toast = useToast();

  // image preview state
  const [imgPreview, setImgPreview] = useState(null);

  async function onSubmit(product) {
    product.inStock = "available";
    product.createdAt = moment().format("ll");
    product.sellerName = user.displayName;
    product.sellerEmail = user.email;
    if (Number(product.newPrice) >= Number(product.oldPrice)) {
      toast({
        title: `Reselling new price should be less than from old price`,
        position: "top",
        isClosable: true,
        status: "error",
      });
      return;
    }

    // formdata for img file
    const formData = new FormData();
    formData.append("image", imgPreview?.imgFile);
    // host img on imgbb
    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.REACT_APP_imgbb_hostkey}`,
        formData
      );
      console.log(data);

      if (data.success) {
        product.productImg = data.data.url;

        // store new product
        try {
          const { data } = await axios.post(
            "http://localhost:4000/products",
            product
          );
          if (data.acknowledged) {
            toast({
              title: `Product Successfully Added`,
              position: "top",
              isClosable: true,
              status: "success",
            });
            navigate("/dashboard/my-products");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
                    focusBorderColor="teal.400"
                  />
                </FormControl>
              </Box>
              <Stack direction={["column", "row"]}>
                {" "}
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Old Amount</FormLabel>
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
                      <NumberInput>
                        <NumberInputField
                          {...register("oldPrice", {
                            required: "This is required",
                          })}
                          placeholder="0000"
                          roundedBottomLeft={0}
                          roundedTopLeft={0}
                        />
                      </NumberInput>
                    </InputGroup>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>New Amount</FormLabel>
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
                      <NumberInput>
                        <NumberInputField
                          {...register("newPrice", {
                            required: "This is required",
                          })}
                          placeholder="0000"
                          roundedBottomLeft={0}
                          roundedTopLeft={0}
                        />
                      </NumberInput>
                    </InputGroup>
                  </FormControl>
                </Box>
              </Stack>
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
                <Stack direction={["column", "row"]}>
                  <FormControl isRequired>
                    <FormLabel>Categories</FormLabel>
                    <Select
                      defaultValue="Home Furniture"
                      {...register("categories", {
                        required: "This is required",
                      })}
                    >
                      <option value="home" texttransform={"capitalize"}>
                        Home Furniture
                      </option>
                      <option value="office" texttransform={"capitalize"}>
                        Office Furniture
                      </option>
                      <option value="restaurent" texttransform={"capitalize"}>
                        Restaurent Furniture
                      </option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Years of use</FormLabel>
                    <NumberInput>
                      <NumberInputField
                        {...register("yearsOfUse", {
                          required: "This is required",
                        })}
                        placeholder="0"
                      />
                    </NumberInput>
                  </FormControl>
                </Stack>
              </Box>
              <Box>
                <Stack direction={["column", "row"]} alignItems={"center"}>
                  <FormControl isRequired>
                    <FormLabel>Product Condition</FormLabel>
                    <Select defaultValue="Excellent">
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <Checkbox {...register("negotiable", {})}>
                      Negotiable
                    </Checkbox>
                  </FormControl>
                </Stack>
              </Box>
              <Box>
                <Stack direction={["column", "row"]}>
                  <FormControl isRequired>
                    <FormLabel>Location</FormLabel>
                    <Input
                      id="location"
                      type="text"
                      {...register("location", {
                        required: "This is required",
                      })}
                      placeholder="eg. Dhaka, Bangladesh"
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
                        {...register("phone", {
                          required: "This is required",
                        })}
                      />
                    </InputGroup>
                  </FormControl>
                </Stack>
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
