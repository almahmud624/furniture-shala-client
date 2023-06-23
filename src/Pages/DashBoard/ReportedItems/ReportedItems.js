import {
  Card,
  CardBody,
  Heading,
  Flex,
  Stack,
  Text,
  SimpleGrid,
  Box,
  Badge,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../../Component/Loader";

const ReportedItems = () => {
  // const { reportedItems } = useContext(DataStoreContext);
  const { data: reportedItems = [], isLoading } = useQuery({
    queryKey: ["reportedItems"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://furniture-shala-server.vercel.app/products/reportedProduct`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Heading
        as="h3"
        size={["lg", "xl", "2xl"]}
        marginBottom={"5"}
        noOfLines={1}
      >
        Reported Items
      </Heading>

      <SimpleGrid columns={[1, 2, 3]} gap={"5"}>
        {reportedItems?.map((reportedItem) => (
          <Card
            direction={{ base: "row" }}
            overflow="hidden"
            display={"flex"}
            justifyContent={"space-between"}
            variant="filled"
            // maxH={"20"}
            key={Math.random()}
          >
            <Flex>
              {/* <Box maxW={{ base: "100%", sm: "200px" }}>
                <Image
                  objectFit="cover"
                  w="full"
                  h="full"
                  src={product?.productImg}
                  alt="Caffe Latte"
                />
              </Box> */}

              <Stack spacing={"0"}>
                <CardBody p={3} ml={1}>
                  <Heading size="sm" fontWeight={"normal"}>
                    <Text
                      display={"inline-block"}
                      mr={2}
                      fontWeight={"semibold"}
                      color={"gray.400"}
                    >
                      Product Name:
                    </Text>
                    {reportedItem?.productName}
                  </Heading>
                  <Box size="sm" fontWeight={"normal"}>
                    <Text
                      display={"inline-block"}
                      mr={2}
                      fontWeight={"semibold"}
                      color={"gray.400"}
                    >
                      Product Id:
                    </Text>
                    {reportedItem?.productId}
                  </Box>
                  <Box size="sm" fontWeight={"normal"}>
                    <Text
                      display={"inline-block"}
                      mr={2}
                      fontWeight={"semibold"}
                      color={"gray.400"}
                    >
                      Reporter Name:
                    </Text>
                    {reportedItem?.reporterEmail}
                  </Box>
                  <Box size="sm" fontWeight={"normal"}>
                    <Text
                      display={"inline-block"}
                      mr={2}
                      fontWeight={"semibold"}
                      color={"gray.400"}
                    >
                      Report Reason:
                    </Text>
                    <Stack display={"inline-flex"} direction={"row"}>
                      {reportedItem?.reason1 && (
                        <Badge
                          px={2}
                          py={1}
                          bg={"gray.50"}
                          _dark={{ bg: "gray.800" }}
                          fontWeight={"400"}
                          color="red.500"
                        >
                          {reportedItem?.reason1}
                        </Badge>
                      )}
                      {reportedItem?.reason2 && (
                        <Badge
                          px={2}
                          py={1}
                          bg={"gray.50"}
                          _dark={{ bg: "gray.800" }}
                          fontWeight={"400"}
                          color="red.500"
                        >
                          {reportedItem?.reason2}
                        </Badge>
                      )}
                    </Stack>
                  </Box>
                </CardBody>
              </Stack>
            </Flex>
            <Box alignItems={"center"}>
              <Text>
                <CloseIcon
                  fontSize={"xs"}
                  mr={"2"}
                  color={"gray.500"}
                  cursor={"pointer"}
                />
              </Text>
            </Box>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default ReportedItems;
