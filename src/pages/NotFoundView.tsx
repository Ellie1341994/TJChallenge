import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { PageBase } from "./Base";
import { ErrorBoard } from "../components/ErrorBoard";
export const NotFoundView = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  return (
    <PageBase>
      <Flex h="100vh" align="center" justify="center">
        <ErrorBoard {...{ asColumn: true, title, message }} />
      </Flex>
    </PageBase>
  );
};
