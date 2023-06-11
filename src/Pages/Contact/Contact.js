import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Image,
  Stack,
} from '@chakra-ui/react';
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md';
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';

export default function Contact() {
  return (
    <Box bg="gray.800" maxW="full" mt={0}  overflow="hidden">
      <Flex justify='center'>
        <Flex
         
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
          gap={10}>
           <Box w={'50%'}>
                  <Heading>Let's talk about everything</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Fill up the form below to contact
                  </Text>
                  <Box mt={10} border={"1px solid #2D3748"}
              rounded="md"
              boxShadow={"0px 0px 14px 0px rgba(0,0,0,0.45) "}
              p={2} >
                    <Image 
  rounded="md"
                w='full' objectFit="cover" h="full" src='https://img.freepik.com/free-photo/portrait-smiling-curly-haired-woman-talks-via-cellphone-enjoys-pleasant-great-conversation-wears-fashionable-jacket-poses_273609-43453.jpg?w=740&t=st=1686468815~exp=1686469415~hmac=70ec98a04655d8a49efe6e193be909206c800abb8b5689391169b8724a7fb105'/>
                  </Box>
                </Box>
             
                <Box flex={1}>
                  <Box mx={8} color="#0B0E3F" >
                <Heading color={'gray.200'}>We would love to hear from you.</Heading>
                <Text my={{ sm: 3, md: 3, lg: 5 }} color="gray.400">
                If you’ve got great products your making or looking to work with us then drop us a line.
                  </Text>
                    <VStack spacing={5} color="gray.200">
                      
                      <FormControl id="name">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<MdOutlineEmail color="gray.800" />}
                          />
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: 'gray.300',
                          }}
                          placeholder="message"
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          variant="solid"
                          bg="#0D74FF"
                          color="white"
                          _hover={{}}>
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
             
        </Flex>
      </Flex>
    </Box>
  );
}