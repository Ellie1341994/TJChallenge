import * as React from "react";
import { PageBase } from "./Base";
import {
  Flex,
  FlexProps,
  Spinner,
  Image,
  Grid,
  GridItem,
  Heading,
  Link,
  Button,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { ErrorBoard } from "../components/ErrorBoard";
import { getBeersFilteredBy } from "../components/beersSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { StoreFilters } from "../components/StoreFilters";

const BeerStore = ({ data }: any) => {
  return (
    <Grid
      w={{ base: "90%", sm: "95%" }}
      h="95%"
      p="1%"
      templateColumns="repeat(3, 30%)"
      gridAutoFlow="dense"
      gap={3}
      mb="2.5%"
    >
      {" "}
      {data.length
        ? data.map((datum: any) => (
            <GridItem
              as={Flex}
              p="2%"
              bgColor="gray.100"
              rounded="md"
              shadow="md"
              key={datum.name}
              alignItems="center"
              justify="center"
              direction="column"
            >
              <Link
                textAlign="center"
                w="100%"
                overflowX="auto"
                isExternal
                as={ReactRouterLink}
                to={`/beer/${datum.id}`}
              >
                <Heading
                  w="100%"
                  overflowX="auto"
                  whiteSpace="nowrap"
                  fontSize="xs"
                >
                  {datum.name}
                </Heading>
              </Link>
              <Image boxSize="50px" objectFit="contain" src={datum.image_url} />
              <Button
                size="xs"
                fontSize="xs"
                color="yellow.600"
                variant="unstyled"
                type="button"
              >
                Buy
              </Button>
            </GridItem>
          ))
        : "No Beers found"}
    </Grid>
  );
};

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
