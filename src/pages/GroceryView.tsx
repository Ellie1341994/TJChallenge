import * as React from "react";
import { PagesBase } from "./Base";
import { Flex } from "@chakra-ui/react";

const Test = ({ children }: any) => <Flex h="100vh" children={children} />;
export const GroceryView = ({ children }: any) => {
  return <PagesBase children={<Test children={children} />} />;
};
