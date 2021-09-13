import * as React from "react";
import {
  Input,
  Text,
  Button,
  Heading,
  Grid,
  GridItem,
  List,
  ListItem,
} from "@chakra-ui/react";
import { SocialNetworks } from "./misc/SocialNetworks";
import { useBreakpointValue } from "@chakra-ui/react";
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
  // mockeup  data
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
  const [buttonMessage, setButtonMessage] = React.useState("Subscribe");
  return (
    <Grid bgColor="gray.100" templateColumns="repeat(4,auto)" p="2%" gap={2}>
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
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            let form: HTMLFormElement = event.currentTarget;
            let email: HTMLInputElement = form.email;
            !email.value
              ? setButtonMessage("Enter your email!")
              : setButtonMessage("Subscribed!");
            setTimeout(() => {
              setButtonMessage("Subscribe");
            }, 1000);
          }}
        >
          <Input
            my="3%"
            borderBottom="1px solid #333"
            variant="flushed"
            name="email"
            type="email"
            size="xs"
            _placeholder={{ fontsize: "6px" }}
            placeholder="Type your e-mail"
            required
          />
          <Button
            type="submit"
            size="xs"
            colorScheme="blackAlpha"
            bgColor="#333"
            isFullWidth
          >
            {buttonMessage}
          </Button>
        </form>
      </GridItem>
    </Grid>
  );
};
