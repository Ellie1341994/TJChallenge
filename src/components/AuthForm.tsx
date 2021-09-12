import * as React from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import {
  Spinner,
  Button,
  Input,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
} from "@chakra-ui/react";
const yupSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});
export const AuthForm = ({
  login,
  to = "/cart",
}: {
  login: boolean;
  to?: string;
}): JSX.Element => {
  const history = useHistory();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={yupSchema}
      onSubmit={(values, { setSubmitting }) => {
        localStorage.setItem("fakeToken", values.email);
        setTimeout(() => {
          history.push(to);
          setSubmitting(false);
        }, 2500);
      }}
    >
      {({ errors, isSubmitting }) => (
        <Flex
          w={{ base: "90%", sm: "75%", md: "50%" }}
          shadow="md"
          rounded="md"
          direction="column"
          p="5%"
          bgColor="gray.100"
          as={Form}
        >
          <FormControl fontSize="xs" my="1%" isInvalid={Boolean(errors.email)}>
            <InputGroup alignItems="center" whiteSpace="nowrap">
              <FormLabel
                bgColor="#333"
                color="white"
                rounded="md"
                my="0"
                p="2%"
                fontSize="xs"
              >
                E-Mail&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
              </FormLabel>
              <Input
                as={Field}
                name="email"
                type="email"
                bgColor="white"
                placeholder="jane@formik.com"
              />
            </InputGroup>
            <FormErrorMessage color="red.600" w="100%" justifyContent="end">
              {errors.email}
            </FormErrorMessage>
            <FormHelperText fontSize="xs">
              We'll never share your email.
            </FormHelperText>
          </FormControl>

          <FormControl
            fontSize="xs"
            mb="10%"
            isInvalid={Boolean(errors.password)}
          >
            <InputGroup alignItems="center" whiteSpace="nowrap">
              <FormLabel
                bgColor="#333"
                color="white"
                rounded="md"
                my="0"
                p="2%"
                fontSize="xs"
              >
                Password
              </FormLabel>
              <Input
                as={Field}
                label="Password"
                bgColor="white"
                name="password"
                type="password"
              />
            </InputGroup>
            <FormErrorMessage color="red.600" w="100%" justifyContent="end">
              {errors.password}
            </FormErrorMessage>
          </FormControl>

          <Button
            margin="0 auto"
            isFullWidth
            bgColor="#333"
            colorScheme="blackAlpha"
            type="submit"
          >
            {isSubmitting ? (
              <Spinner color="white" />
            ) : login ? (
              "Login"
            ) : (
              "Register"
            )}
          </Button>
        </Flex>
      )}
    </Formik>
  );
};
