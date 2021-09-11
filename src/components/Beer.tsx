import * as React from "react";
import { Beer as IBeer } from "../types/beer";
import { Image } from "@chakra-ui/react";
export const Beer = ({
  name,
  description,
  tagline,
  imageURL,
  firstBrewed,
  foodPairing,
  brewersTips,
  ingredients,
}: IBeer): JSX.Element => {
  return <Image alt="A Beer" src={imageURL ?? undefined} />;
};
