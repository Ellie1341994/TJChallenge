import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
export const ErrorBoard = ({
  asColumn = false,
  title = "Error",
  status = "error",
  message,
}: {
  status?: "error" | "success" | "warning" | "info";
  asColumn?: boolean;
  title?: string;
  message: string;
}) => (
  <Alert
    status={status}
    flexDirection={asColumn ? "column" : "row"}
    rounded="md"
    w={{ base: "90%", sm: "50%" }}
  >
    <AlertIcon />
    <AlertTitle mr={2}>{title} </AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);
