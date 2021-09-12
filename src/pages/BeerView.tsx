import * as React from "react";
import { Beer } from "../components/Beer";
import { PageBase } from "./Base";
import { getBeer } from "../components/beersSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

type TBeerView = ({ beerId }: { beerId: string }) => JSX.Element;
export const BeerView: TBeerView = ({ beerId: id }) => {
  const dispatch = useAppDispatch();
  const {
    data: [beerProps],
    status,
    message,
  } = useAppSelector(({ beers }) => beers);
  React.useEffect(() => {
    dispatch(getBeer({ id }));
  }, []);

  return (
    <PageBase>
      <Beer {...beerProps} />
    </PageBase>
  );
};
