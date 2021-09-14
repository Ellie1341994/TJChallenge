import * as React from "react";
import { Flex, Image, Grid, GridItem, Heading, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export const BeerStore = ({ data }: any) => {
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
              <Link
                size="xs"
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
          ))
        : "No Beers found"}
    </Grid>
  );
};
