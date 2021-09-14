import * as React from "react";
import {
  Flex,
  Link,
  LinkProps,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { SocialNetworks } from "./misc/SocialNetworks";
import { IoIosCart } from "react-icons/io";
import { GiBeerBottle } from "react-icons/gi";

const Logo = () => {
  return (
    <Flex direction="column">
      <Heading textAlign="center" color="gray.50" as="h1" p="2%">
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

const AuthLinks = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const authLinkProsp: LinkProps = {
    bgColor: "gray.100",
    color: "#333",
    rounded: "md",
    padding: "5px",
    width: "75px",
    textTransform: "capitalize",
    textAlign: "center",
    fontSize: { base: "xs", sm: "md" },
  };
  const auth = ["login", "register"];
  return isAuthenticated ? (
    <Link
      {...authLinkProsp}
      as={ReactRouterLink}
      alignSelf="center"
      to={`/`}
      onClick={() => localStorage.removeItem("fakeToken")}
    >
      {"Logout"}
    </Link>
  ) : (
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
const NavBar = ({ isAuthenticated = false }) => {
  const navBarLinkProps: LinkProps = {
    padding: "1%",
    textTransform: "capitalize",
    textAlign: "center",
    fontWeight: "bold",
    alignSelf: "center",
    color: "gray.50",
  };
  const sections = [
    ["contact", undefined],
    ["beers", GiBeerBottle],
  ];
  if (isAuthenticated) {
    sections.push(["history", undefined]);
  }
  return (
    <Flex as="nav" direction="row" justify="space-evenly" p="0%">
      {sections.map(([section, Icon], index) => (
        <Link
          key={`navlink#${index}`}
          {...navBarLinkProps}
          fontSize={{ base: "xs", sm: "sm" }}
          as={ReactRouterLink}
          to={`/${section}`}
          display="flex"
          alignItems="center"
        >
          {Icon && <Icon color="inherit" size={24} />}
          {section}
        </Link>
      ))}
      <AuthLinks isAuthenticated={isAuthenticated} />
      {isAuthenticated && (
        <Link
          rounded="md"
          fontSize={{ base: "xs", sm: "md" }}
          p="1%"
          display="flex"
          color="#333"
          bgColor="yellow.600"
          alignItems="center"
        >
          <IoIosCart color="inherit" size={18} />
          Cart
        </Link>
      )}
    </Flex>
  );
};

export const MainHeader = () => {
  return (
    <Grid
      pb="1%"
      bgColor="#333"
      templateRows="repeat(2, 0fr)"
      templateColumns="repeat(2, 50%)"
    >
      <GridItem rowSpan={1} colSpan={2}>
        <Logo />
      </GridItem>
      <GridItem rowSpan={1} rowStart={2} rowEnd={2} colSpan={2}>
        <NavBar isAuthenticated={Boolean(localStorage.getItem("fakeToken"))} />
      </GridItem>
    </Grid>
  );
};
