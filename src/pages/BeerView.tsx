import * as React from "react";
import { Beer } from "../components/Beer";
import { PageBase } from "./Base";
import { getBeer, seeBeer } from "../components/beersSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Flex, Spinner } from "@chakra-ui/react";
import { ErrorBoard } from "../components/ErrorBoard";

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
    dispatch(seeBeer(id));
  }, []);

  return (
    <PageBase>
      {status === "loading" && (
        <Flex justify="center" align="center" h="100vh">
          <Spinner padding="10%" />
        </Flex>
      )}
      {status === "failed" && (
        <Flex justify="center" align="center" direction="column" h="100vh">
          <ErrorBoard message={message} />
        </Flex>
      )}
      {status === "success" && <Beer {...beerProps} />}
    </PageBase>
  );
};
