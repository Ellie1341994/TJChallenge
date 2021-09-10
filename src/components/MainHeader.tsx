import * as React from "react";
import {
  Flex,
  Link,
  LinkProps,
  Heading,
  Grid,
  GridItem,
  FlexProps,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { CgTwitter } from "react-icons/cg";

const Logo = () => {
  return (
    <Flex direction="column">
      <Heading textAlign="center" as="h1">
        The Beer of Tomorrow
      </Heading>
      <SocialNetworks justify="space-evenly" align="center" />
    </Flex>
  );
};

const SocialNetworks = ({ ...props }: FlexProps) => {
  return (
    <Flex {...props}>
      <Link href="https://www.facebook.com/" isExternal>
        <AiFillFacebook color="#333" />
      </Link>
      <Link href="https://www.instagram.com/" isExternal>
        <AiFillInstagram color="#333" />
      </Link>
      <Link href="https://twitter.com/" isExternal>
        <CgTwitter color="#333" />
      </Link>
    </Flex>
  );
};
const Auth = () => {
  const commonLinkProps: LinkProps = {
    bgColor: "#333",
    color: "#eee",
    rounded: "md",
    padding: "5px",
    width: "75px",
    textTransform: "capitalize",
    textAlign: "center",
  };
  const auth = ["login", "register"];
  return (
    <Flex justify="space-evenly" w="100%">
      {auth.map((type) => (
        <Link {...commonLinkProps} as={ReactRouterLink} to={`/${type}`}>
          {type}
        </Link>
      ))}
    </Flex>
  );
};
const NavBar = ({ auth = false }) => {
  const commonLinkProps: LinkProps = {
    padding: "1%",
    textTransform: "capitalize",
    textAlign: "center",
  };
  const sections = ["contact", "history", "grocery"];
  return (
    <Flex direction="row" justify="space-evenly" p="1%">
      <Link {...commonLinkProps} as={ReactRouterLink} to={`/`}>
        us
      </Link>
      {sections.map((section) => (
        <Link {...commonLinkProps} as={ReactRouterLink} to={`/${section}`}>
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
