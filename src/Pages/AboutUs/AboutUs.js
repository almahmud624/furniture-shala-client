import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Icon,
    IconProps,
    Box,
    Image,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
  } from '@chakra-ui/react';
  
  export default function AboutUs() {
    return (
      <Box maxW={'90%'} mx="auto">
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}>
          <Heading
            fontWeight={700}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            lineHeight={'110%'}>
           We’re Devoted Marketing
Consultants Helping Your Business Grow
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor labore et dolore magna aliqua. Venenatis tellu metus


          </Text>
         
          <Flex w={'full'} justify={'center'}>
            <Box w={'full'} border={"1px solid #2D3748"}
              rounded="md"
              boxShadow={"0px 0px 14px 0px rgba(0,0,0,0.45) "}
              p={2} >
                <Image rounded="md" objectFit={'cover'} w={'full'} src='https://img.freepik.com/free-photo/business-team-working-office-worker-concept_53876-23476.jpg?w=740&t=st=1686486896~exp=1686487496~hmac=2361b15302f7cd0d7f35fc4440b48e1bfd5a572f0746c048ca4209f150112cd3'/>
            </Box>
          </Flex>
        </Stack>
        <CustomerService/>
      </Box>
    );
  }
  
 function CustomerService() {
    return (
      <Box>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}>
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
             
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '4xl' }}>
              We Provide Continuous & Kind Service for Customers
            </Heading>
           
            <Accordion allowToggle>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
          Section 1 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
          Section 2 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
          Section 2 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>
</Accordion>
          </Stack>
          <Flex
            flex={1}
            justify={'center'}
           
            w={'full'}>
           
            <Box
             
              height={'300px'}
              rounded={'2xl'}
              boxShadow={'2xl'}
              width={'full'}
              overflow={'hidden'}>
             
              <Image
                alt={'Hero Image'}
                fit={'cover'}
                w={'100%'}
                h={'100%'}
                src={
                  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                }
              />
            </Box>
          </Flex>
        </Stack>
      </Box>
    );
  }
  