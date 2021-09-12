import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
export const ErrorBoard = ({ message }: { message: string }) => (
  <Alert status="error" rounded="md" w={{ base: "90%", sm: "50%" }}>
    <AlertIcon />
    <AlertTitle mr={2}>Error </AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);
