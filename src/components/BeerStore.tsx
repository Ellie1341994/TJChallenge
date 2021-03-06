import * as React from "react";
import {
  Button,
  Flex,
  Image,
  Grid,
  GridItem,
  Heading,
  Link,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { getBeersFilteredBy, buyBeer } from "../components/beersSlice";
import { useAppDispatch } from "../app/hooks";
import { useHistory } from "react-router-dom";

const BeerItem = ({ cart = [], datum }: any) => {
  const dispatch = useAppDispatch();
  const onCart = cart.includes(`${datum.id}`);
  const history = useHistory();
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
        isExternal
        as={ReactRouterLink}
        to={`/beer/${datum.id}`}
      >
        <Heading
          overflowX="auto"
          overflowY="hidden"
          whiteSpace="nowrap"
          fontSize="xs"
        >
          {datum.name}
        </Heading>
      </Link>
      <Image boxSize="50px" objectFit="contain" src={datum.image_url} />
      <Button
        size="xs"
        fontWeight="bold"
        fontSize="xs"
        color="yellow.600"
        variant="unstyled"
        type="button"
        disabled={onCart}
        onClick={() => {
          if (localStorage.getItem("fakeToken") === null) {
            history.push("/login");
          } else {
            dispatch(buyBeer(`${datum.id}`));
          }
        }}
      >
        {onCart ? "On cart" : "Buy"}
      </Button>
    </GridItem>
  );
};
export const BeerStore = ({ cart, filters, data }: any) => {
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
          <BeerItem cart={cart} key={datum.name} datum={datum} />
        ))}
        <GridItem as={Flex} w="100%" justifyContent="space-between" colSpan={3}>
          <Heading
            textAlign="center"
            alignSelf="center"
            size="md"
            w="100%"
            whiteSpace="pre"
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
            gridColumnEnd={2}
            whiteSpace="pre"
            alignSelf="center"
            justifySelf="end"
            textAlign="center"
            size="md"
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
        </GridItem>
      </Grid>
    </>
  ) : (
    <Heading textAlign="center" w="100%">
      {" "}
      No Beer found{" "}
    </Heading>
  );
};
