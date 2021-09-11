import * as React from "react";
import {
  Input,
  Text,
  Button,
  Flex,
  Link,
  LinkProps,
  Heading,
  Grid,
  GridItem,
  GridProps,
  FlexProps,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { SocialNetworks } from "./misc/SocialNetworks";
import { useBreakpointValue } from "@chakra-ui/react";
const FOOTER_GRID_PROPS: GridProps = { bgColor: "#333", color: "#eee" };
type TFooterList = ({ data }: { data: string[] | [] }) => JSX.Element;
const FooterList: TFooterList = ({ data = [] }) => {
  return (
    <List fontSize="xs">
      {data.map((datum) => (
        <ListItem key={`FooterListItem#${datum}`}>{datum}</ListItem>
      ))}
    </List>
  );
};
export const Footer = () => {
  const emails = [
    "eveniet@libero.com",
    "odit@provident.com ",
    "dores@remque.com ",
  ];
  const partners = [
    "Lorem, ipsum dolor.",
    "Quod",
    "Saepe labore",
    "Adipisicing elit.",
    "Consectetur.",
    "Sit amet.",
  ];
  const baseSizeScreen = useBreakpointValue({ base: true, sm: false });
  return (
    <Grid templateColumns="repeat(4,auto)" p="2%" gap={2}>
      <GridItem>
        <Heading size="sm" fontWeight="bold">
          Social media
        </Heading>
        <SocialNetworks fontSize="xs" direction="column" displayNames />
      </GridItem>
      <GridItem>
        <Heading size="sm" fontWeight="bold">
          Contact
        </Heading>
        <FooterList data={emails} />
      </GridItem>
      {!baseSizeScreen && (
        <GridItem>
          <Heading size="sm" fontWeight="bold">
            Partners
          </Heading>
          <FooterList data={partners} />
        </GridItem>
      )}
      <GridItem>
        <Heading size="sm" fontWeight="bold">
          Newsletter
        </Heading>
        <Text fontSize="xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Text>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
            event.preventDefault()
          }
        >
          <Input
            variant="flushed"
            size="xs"
            _placeholder={{ fontsize: "6px" }}
            placeholder="Type your e-mail"
          />
          <Button size="xs" isFullWidth>
            Submit
          </Button>
        </form>
      </GridItem>
    </Grid>
  );
};
