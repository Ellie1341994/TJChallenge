import * as React from "react";
import { PageBase } from "../pages/Base";
import { AuthForm } from "../components/AuthForm";
import { Flex } from "@chakra-ui/react";
export const AuthView = ({ type, to = "" }: { type: string; to?: string }) => {
  return (
    <PageBase>
      <Flex h="100vh" justify="center" align="center">
        <AuthForm login={/login/.test(type)} to={to} />
      </Flex>
    </PageBase>
  );
};
