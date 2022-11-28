import React from "react";
import { Box, VStack, Stack, Text, chakra } from "@chakra-ui/react";
const articles = [
  {
    id: 1,
    title:
      "What are the different ways to manage a state in a React application?",
    content: `Every React component has a built-in state. This state is an object which stores the property values that belong to a component. State is able to keep data from different components in-sync because each state update re-renders all relevant components. 
    The built-in way that React provides for setting component states is by using setState() and adding “local state” to a class. There are several other ways to manage state​s in React, including the use of:
    Hooks
    React Context API
    Apollo Link State`,
  },
  {
    id: 2,

    title: "How does prototypical inheritance work?",
    content: `When we read a property from object, and it’s missing, JavaScript automatically takes it from the prototype. In programming, this is called “prototypal inheritance”. And soon we’ll study many examples of such inheritance, as well as cooler language features built upon it.The property [[Prototype]] is internal and hidden, but there are many ways to set it.`,
  },
  {
    id: 3,
    title: "What is a unit test? Why should we write unit tests?",
    content: `The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.`,
  },
  {
    id: 4,
    title: "React vs. Angular vs. Vue?",
    content: `1. React doesn’t enforce a specific project structure, and as you can see from the official “Hello World” example below, you can start using React with just a few lines of code.
    2. The Vue.js core library focuses on the View layer only. It’s called a progressive framework because you can extend its functionality with official and third-party packages, such as Vue Router or Vuex, to turn it into an actual framework.
    3. AngularJS, the original framework, is an MVC (Model-View-Controller)) framework. But in Angular 2, there’s no strict association with MV*-patterns as it is also component-based.Projects in Angular are structured into Modules, Components, and Services. Each Angular application has at least one root component and one root module.
    `,
  },
];

const Blog = () => {
  return (
    <Box py={"24"} maxW={"2xl"} mx={"auto"} px={4}>
      <Box>
        <chakra.h2
          mb={4}
          fontSize={{
            base: "2xl",
            md: "4xl",
          }}
          fontWeight="semibold"
          letterSpacing="tight"
          textAlign={{
            base: "center",
            md: "left",
          }}
          color="gray.900"
          _dark={{
            color: "gray.400",
          }}
          lineHeight={{
            md: "shorter",
          }}
          textShadow="2px 0 currentcolor"
        >
          Some Question
        </chakra.h2>
      </Box>
      <VStack spacing={8} w={{ base: "auto", md: "2xl" }}>
        {articles.map((article, index) => (
          <Stack
            key={Math.random()}
            direction="column"
            spacing={4}
            p={4}
            bg={"gray.100"}
            _dark={{
              bg: "gray.800",
            }}
            border="1px solid"
            borderColor="blue.100"
            rounded="lg"
          >
            <Box textAlign="left">
              <Text fontSize="xl" lineHeight={1.2} fontWeight="bold" w="100%">
                {article.title}
              </Text>
              <Text fontSize="md" color="gray.500" lineHeight="normal">
                {article.content}
              </Text>
            </Box>
          </Stack>
        ))}
      </VStack>
    </Box>
  );
};

export default Blog;
