import * as React from "react";
import {
  Flex,
  Link,
  LinkProps,
  Heading,
  Grid,
  Button,
  GridItem,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { SocialNetworks } from "./misc/SocialNetworks";
import { FaOpencart } from "react-icons/fa";

const Logo = () => {
  return (
    <Flex direction="column">
      <Heading textAlign="center" as="h1" p="2%">
        The Beer of Tomorrow
        <SocialNetworks
          as="sub"
          display="inline"
          p="1%"
          justify="flex-start"
          align="center"
        />
      </Heading>
    </Flex>
  );
};

const AuthButtons = () => {
  const authLinkProsp: LinkProps = {
    bgColor: "#333",
    color: "white",
    rounded: "md",
    padding: "5px",
    width: "75px",
    textTransform: "capitalize",
    textAlign: "center",
  };
  const auth = ["login", "register"];
  return (
    <>
      {" "}
      {auth.map((type, index) => (
        <Link
          key={`authLink#${index}`}
          {...authLinkProsp}
          as={ReactRouterLink}
          alignSelf="center"
          to={`/${type}`}
        >
          {type}
        </Link>
      ))}
    </>
  );
};
const NavBar = ({ auth = false }) => {
  const navBarLinkProps: LinkProps = {
    padding: "1%",
    textTransform: "capitalize",
    textAlign: "center",
    fontWeight: "bold",
    alignSelf: "center",
  };
  const sections = ["contact", "store"];
  if (auth) {
    sections.push("history");
  }
  return (
    <Flex as="nav" direction="row" justify="space-evenly" p="0%">
      {sections.map((section, index) => (
        <Link
          key={`navlink#${index}`}
          {...navBarLinkProps}
          fontSize={{ base: "xs", sm: "sm" }}
          as={ReactRouterLink}
          to={`/${section}`}
        >
          {section}
        </Link>
      ))}
      {auth && (
        <Button
          rightIcon={<FaOpencart color="white" size={24} />}
          colorScheme="blackAlpha"
          bgColor="#333"
        >
          Cart
        </Button>
      )}
      <AuthButtons />
    </Flex>
  );
};

export const MainHeader = () => {
  return (
    <Grid templateRows="repeat(2, 0fr)" templateColumns="repeat(2, 50%)">
      <GridItem rowSpan={1} colSpan={2}>
        <Logo />
      </GridItem>
      <GridItem rowSpan={1} rowStart={2} rowEnd={2} colSpan={2}>
        <NavBar />
      </GridItem>
    </Grid>
  );
};
