import * as React from "react";
import { Beer } from "../components/Beer";
import { Beer as IBeer } from "../types/beer";

type TBeerView = ({ BeerId }: { BeerId: string }) => JSX.Element;
export const BeerView: TBeerView = ({ BeerId }) => {
  return (
    <Beer
      name="TestBeer"
      imageURL=""
      description="testDescription"
      firstBrewed="1994"
    />
  );
};
