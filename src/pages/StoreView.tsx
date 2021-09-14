import * as React from "react";
import { PageBase } from "./Base";
import { Flex, FlexProps, Spinner } from "@chakra-ui/react";
import { ErrorBoard } from "../components/ErrorBoard";
import { getBeersFilteredBy } from "../components/beersSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { StoreFilters } from "../components/StoreFilters";
import { BeerStore } from "../components/BeerStore";

export const StoreView = ({ filters }: { filters: string }) => {
  const dispatch = useAppDispatch();
  const { data, status, message } = useAppSelector(({ beers }) => beers);
  React.useEffect(() => {
    dispatch(getBeersFilteredBy({ filters }));
  }, []);
  const commonFlexProps: FlexProps = {
    justify: "center",
    align: "center",
    h: "100vh",
  };
  return (
    <PageBase>
      {status === "loading" && (
        <Flex {...commonFlexProps}>
          <Spinner padding="10%" />
        </Flex>
      )}
      {status === "failed" && (
        <Flex {...commonFlexProps} direction="column">
          <ErrorBoard message={message} />
        </Flex>
      )}
      {status === "success" && (
        <Flex
          justify="center"
          align="center"
          direction="column"
          minH="100vh"
          w="100%"
        >
          <StoreFilters initialFilters={filters} />
          <BeerStore data={data} />
        </Flex>
      )}
    </PageBase>
  );
};
