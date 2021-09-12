import * as React from "react";
import {
  Beer as IBeer,
  Ingredients as IIngredients,
  Hop,
  Malt,
} from "../types/beer";
import { Image } from "@chakra-ui/react";
import {
  useBreakpointValue,
  Flex,
  Heading,
  Grid,
  FlexProps,
  Box,
  BoxProps,
  GridItem,
  Text,
  Link,
  ListItem,
  List,
} from "@chakra-ui/react";
const Ingredients = ({
  name,
  data,
}: {
  name: string;
  data: Array<Hop | Malt> | null;
}) => (
  <List p="1%" fontSize={{ base: "xs", sm: "sm" }}>
    <Heading as="h3" fontSize="inherit" textTransform="capitalize">
      {name}
    </Heading>
    {data?.map(({ name, amount }, index): any => (
      <ListItem
        key={`${name + "#" + index}`}
      >{`${name} ${amount?.value} ${amount?.unit}`}</ListItem>
    ))}
  </List>
);
const IngredientsSection = ({
  malt,
  hops,
  yeast,
}: IIngredients): JSX.Element | null => {
  return (
    <Flex direction="column">
      <Heading fontSize={{ base: "sm", sm: "md" }}>Ingredients</Heading>
      {Object.entries({ malt, hops }).map(
        ([name, variants]: [string, Hop[] | Malt[] | null], index) => (
          <Ingredients
            key={`ingredient#${index}`}
            name={name}
            data={variants}
          />
        )
      )}
      <List p="1%" fontSize={{ base: "xs", sm: "sm" }}>
        <Heading as="h3" fontSize="inherit">
          Yeast
        </Heading>
        <ListItem>{yeast}</ListItem>
      </List>
    </Flex>
  );
};
const FoodPairingSection = ({
  food_pairing,
}: {
  food_pairing: string[] | null;
}) => (
  <>
    <Heading fontSize={{ base: "sm", sm: "md" }} pt="1%">
      Food pairing
    </Heading>
    <List p="1%" fontSize={{ base: "sm", sm: "md" }}>
      {food_pairing?.map((pair: string, index: number) => (
        <ListItem key={`foodPairing#${index}`}>{pair}</ListItem>
      ))}
    </List>
  </>
);
const TipsSection = ({ brewers_tips }: { brewers_tips: string | null }) => (
  <>
    <Heading fontSize={{ base: "sm", sm: "md" }}>Brewer tips</Heading>
    <Text p="1%" fontSize={{ base: "sm", sm: "md" }}>
      {brewers_tips}
    </Text>
  </>
);
const ExtraInformationBoard = ({
  food_pairing = ["None"],
  brewers_tips = "None",
  ingredients = { malt: [], hops: [], yeast: "" },
  ...flexProps
}: {
  food_pairing?: string[] | null;
  brewers_tips?: string | null;
  ingredients?: IIngredients;
} & FlexProps) => {
  const screenIsAtLeastSM = useBreakpointValue({
    base: false,
    sm: true,
    md: true,
  });
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    setShow(screenIsAtLeastSM ?? false);
  }, []);
  return (
    <Flex
      p="2.5%"
      rounded="md"
      bgColor="gray.100"
      direction="column"
      {...flexProps}
    >
      {!screenIsAtLeastSM && (
        <Link
          fontSize="xs"
          textAlign="left"
          onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            event.preventDefault();
            setShow(!show);
          }}
          pb={show ? "2%" : 0}
        >
          {`${show ? "Hide" : "See"} extra information`}
        </Link>
      )}
      {show ? (
        <>
          <IngredientsSection {...ingredients} />
          <FoodPairingSection food_pairing={food_pairing} />
          <TipsSection brewers_tips={brewers_tips} />
        </>
      ) : null}
    </Flex>
  );
};
const MainInformationBoard = ({
  name,
  tagline,
  image_url,
  description,
  first_brewed,
  ...BoxProps
}: IBeer & BoxProps) => (
  <Box
    w={{ base: "100%", sm: "50%" }}
    h={{ base: "auto", sm: "100%" }}
    overflowY={useBreakpointValue({ base: "visible", sm: "auto" })}
    {...BoxProps}
  >
    <Heading px="1%" textAlign="left">
      {name}
    </Heading>
    <Text px="1%" fontSize="sm">
      {tagline} First brewed in {first_brewed}
    </Text>
    <Image
      p="5%"
      alt="A Beer"
      boxSize={{ base: "100vw", sm: "100%" }}
      objectFit="contain"
      src={image_url ?? undefined}
      fallbackSrc={""}
    />
    <Text p="1%" fontSize="sm">
      {description}
    </Text>
  </Box>
);
export const Beer = ({
  name,
  description,
  tagline,
  image_url,
  first_brewed,
  food_pairing = [],
  brewers_tips = "",
  ingredients,
  ...rest
}: IBeer): JSX.Element => {
  return (
    <Flex
      direction={{ base: "column", sm: "row-reverse" }}
      p="5%"
      h={{ base: "100vh" }}
      overflowY="auto"
    >
      <MainInformationBoard
        {...{ name, description, tagline, image_url, first_brewed }}
      />
      <ExtraInformationBoard
        w={{ base: "100%", sm: "50%" }}
        {...{ brewers_tips, food_pairing, ingredients }}
        justify="center"
      />
    </Flex>
  );
};
