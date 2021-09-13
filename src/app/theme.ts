import { extendTheme } from "@chakra-ui/react";
export const theme = extendTheme({
  fonts: {
    heading: "Grenze Gotisch",
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "gray.50",
        color: "#333",
      },
    },
  },
});
