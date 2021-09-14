import * as React from "react";
import { PageBase } from "./Base";
import {
  Grid,
  Flex,
  Text,
  Image,
  Heading,
  FlexProps,
  Spinner,
  GridItem,
  Button,
  Circle,
} from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { ErrorBoard } from "../components/ErrorBoard";
import { getBeersFilteredBy } from "../components/beersSlice";

const CartItem = ({ datum }: any) => {
  const [amount, setAmount] = React.useState(1);
  return (
    <Grid gridTemplateColumns="20% 50% 30%" gap={2} gridTemplateRows="25% 75%">
      <GridItem rowSpan={2} textAlign="center" alignSelf="center">
        <Heading fontSize={{ base: "5xl", sm: "9xl" }}>{amount}x</Heading>
      </GridItem>
      <GridItem>
        <Heading
          size="md"
          overflowX="auto"
          overflowY="hidden"
          whiteSpace="nowrap"
        >
          {datum.name}
        </Heading>
      </GridItem>
      <GridItem colEnd={2} colStart={2}>
        <Image boxSize="100px" objectFit="contain" src={datum.image_url} />
      </GridItem>
      <GridItem colStart={3} colEnd={3} rowSpan={2}>
        <Circle
          bgColor="yellow.600"
          size="50px"
          color="gray.50"
          onClick={() => setAmount(amount + 1)}
        >
          +
        </Circle>
        <Circle
          bgColor="yellow.600"
          size="50px"
          color="gray.50"
          onClick={() => amount > 0 && setAmount(amount - 1)}
        >
          -
        </Circle>
      </GridItem>
    </Grid>
  );
};
const PaymentBoard = () => {
  return (
    <Flex
      position="sticky"
      top="0"
      shadow="md"
      direction="column"
      justify="space-between"
      bgColor="#333"
      m="1%"
      rounded="md"
      w="29%"
      h="75vh"
    >
      <Heading textAlign="center" color="yellow.600">
        Payment
      </Heading>
      <Text p="5%" color="gray.50" fontSize={{ base: "xs", sm: "md" }}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel aliquam
        tenetur accusamus, alias aperiam aspernatur minima officia est quis
        fugiat, corporis consequatur velit voluptas obcaecati architecto eos et
        doloribus! Cupiditate.
      </Text>
      <Text
        p="5%"
        color="gray.50"
        fontSize={{ base: "xs", sm: "md" }}
        isTruncated
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam quod
        itaque id facilis vitae ea omnis sapiente, delectus, accusamus, sunt
        explicabo ut similique ipsam. Deserunt iste et minima corporis
        recusandae.
      </Text>
      <Button
        onClick={() => window.location.reload()}
        type="button"
        bgColor="yellow.600"
      >
        Pay
      </Button>
    </Flex>
  );
};
export const CartView = () => {
  const { data, status, message, cart } = useAppSelector(({ beers }) => beers);
  const commonFlexProps: FlexProps = {
    justify: "center",
    align: "center",
    h: "100vh",
  };
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const filters = `?ids=${cart.join("|")}`;
    dispatch(getBeersFilteredBy({ filters }));
  }, []);
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
        <Flex minH="100vh">
          <Flex direction="column" w="70%">
            {data.length ? (
              data.map((datum) => <CartItem datum={datum} />)
            ) : (
              <Heading fontSize="9xl" m="0 auto">
                Buy some beers!
              </Heading>
            )}
          </Flex>
          <PaymentBoard />
        </Flex>
      )}
    </PageBase>
  );
};
