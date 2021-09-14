import * as React from "react";
import { Flex, Image, Grid, GridItem, Heading, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { getBeersFilteredBy } from "../components/beersSlice";
import { useAppDispatch } from "../app/hooks";
import { useHistory } from "react-router-dom";

const BeerItem = ({ datum }: any) => {
  return (
    <GridItem
      as={Flex}
      p="2%"
      bgColor="gray.100"
      rounded="md"
      shadow="md"
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
        <Heading w="100%" overflowX="auto" whiteSpace="nowrap" fontSize="xs">
          {datum.name}
        </Heading>
      </Link>
      <Image boxSize="50px" objectFit="contain" src={datum.image_url} />
      <Link
        size="xs"
        fontWeight="bold"
        fontSize="xs"
        color="yellow.600"
        variant="unstyled"
        type="button"
        as={ReactRouterLink}
        to={`/cart/${datum.id}`}
      >
        Buy
      </Link>
    </GridItem>
  );
};
export const BeerStore = ({ filters, data }: any) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const paramsController = new URLSearchParams(filters);
  let page: number = parseInt(paramsController.get("page") ?? "") || 0;
  return data.length ? (
    <>
      <Grid
        w={{ base: "90%", sm: "95%" }}
        h="95%"
        p="1%"
        templateColumns="repeat(3, 30%)"
        gridAutoFlow="dense"
        gap={3}
        mb="2.5%"
      >
        {data.map((datum: any) => (
          <BeerItem key={datum.name} datum={datum} />
        ))}
        <Heading
          textAlign="center"
          w="100%"
          onClick={() => {
            paramsController.set("page", String(page - 1));
            filters = "?" + paramsController.toString();
            dispatch(getBeersFilteredBy({ filters })).then(() =>
              history.push(`/beers${filters}`)
            );
          }}
        >
          Previous Beers
        </Heading>
        <Heading
          gridColumnStart={3}
          textAlign="center"
          w="100%"
          onClick={() => {
            paramsController.set("page", String(page + 1));
            filters = "?" + paramsController.toString();
            dispatch(getBeersFilteredBy({ filters })).then(() =>
              history.push(`/beers${filters}`)
            );
          }}
        >
          Next Beers
        </Heading>
      </Grid>
    </>
  ) : (
    <Heading textAlign="center" w="100%">
      {" "}
      No Beer found{" "}
    </Heading>
  );
};
