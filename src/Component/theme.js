import { extendTheme } from "@chakra-ui/react";
const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};
const theme = extendTheme({
  config,
  colors: {
    primary: "#2C74B3",
    secondary: "#144272",
  },
});

export default theme;
