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
const NAVBAR_LINK_PROPS: LinkProps = {
  padding: "1%",
  textTransform: "capitalize",
  textAlign: "center",
};
const AUTH_LINK_PROPS: LinkProps = {
  bgColor: "#333",
  color: "#eee",
  rounded: "md",
  padding: "5px",
  width: "75px",
  textTransform: "capitalize",
  textAlign: "center",
};

const Logo = () => {
  return (
    <Flex direction="column">
      <Heading size="lg" textAlign="center" as="h1">
        The Beer of Tomorrow
      </Heading>
      <SocialNetworks p="2.5%" justify="space-evenly" align="center" />
    </Flex>
  );
};

const Auth = () => {
  const auth = ["login", "register"];
  return (
    <Flex justify="space-evenly" w="100%">
      {auth.map((type, index) => (
        <Link
          key={`authLink#${index}`}
          {...AUTH_LINK_PROPS}
          as={ReactRouterLink}
          to={`/${type}`}
        >
          {type}
        </Link>
      ))}
    </Flex>
  );
};
const NavBar = ({ auth = false }) => {
  const sections = ["contact", "grocery", "history"];
  return (
    <Flex direction="row" justify="space-evenly" p="1%">
      {sections.map((section, index) => (
        <Link
          key={`navlink#${index}`}
          {...NAVBAR_LINK_PROPS}
          as={ReactRouterLink}
          to={`/${section}`}
        >
          {section}
        </Link>
      ))}
    </Flex>
  );
};

export const MainHeader = () => {
  return (
    <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 50%)">
      <GridItem rowSpan={1} colStart={1} colEnd={1}>
        <Logo />
      </GridItem>
      <GridItem
        w="100%"
        alignSelf="center"
        justifySelf="center"
        rowSpan={1}
        colStart={2}
        colEnd={2}
      >
        <Auth />
      </GridItem>
      <GridItem rowSpan={1} rowStart={2} rowEnd={2} colSpan={2}>
        <NavBar />
      </GridItem>
    </Grid>
  );
};
