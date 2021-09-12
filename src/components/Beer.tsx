import * as React from "react";
import { Beer as IBeer, Ingredients as IIngredients } from "../types/beer";
import { Image } from "@chakra-ui/react";
import {
  Flex,
  Heading,
  Grid,
  GridItem,
  Text,
  ListItem,
  List,
} from "@chakra-ui/react";
const Ingredients = (ingredients: any): JSX.Element | null => {
  return null;
};
export const Beer = ({
  name,
  description,
  tagline,
  image_url,
  first_brewed,
  food_pairing,
  brewers_tips,
  ingredients,
  ...rest
}: IBeer): JSX.Element => {
  return (
    <Flex direction="column" p="5%" height={{ base: "100vh" }} overflowY="auto">
      <Heading textAlign="left">{name}</Heading>
      <Text fontSize="sm">{tagline}</Text>
      <Image
        p="5%"
        alt="A Beer"
        boxSize="100vw"
        objectFit="contain"
        src={image_url ?? undefined}
      />
      <Text p="1%" fontSize="sm">
        {description}
      </Text>
      <Heading fontSize="sm" pt="1%">
        Food pairing
      </Heading>
      <List p="1%" fontSize="xs">
        {food_pairing?.map((pair) => (
          <ListItem>{pair}</ListItem>
        ))}
      </List>
      <Heading fontSize="sm">Brewer tips</Heading>
      <Text p="1%" fontSize="xs">
        {brewers_tips}
      </Text>
    </Flex>
  );
};
