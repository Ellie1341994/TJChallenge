import * as React from "react";
import { getBeersFilteredBy } from "../components/beersSlice";
import { useAppDispatch } from "../app/hooks";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  InputGroup,
  Input,
  Grid,
} from "@chakra-ui/react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const FilterInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <FormControl size="xs" isInvalid={Boolean(meta.touched && meta.error)}>
      <InputGroup size="xs" justifyContent="space-between">
        <FormLabel
          size="xs"
          fontSize="xs"
          display="flex"
          justifyContent="center"
          alignItems="end"
          textTransform="capitalize"
          mb="0"
          p="1%"
          htmlFor={props.id || props.name}
        >
          {label
            .replace(/_gt$/, " above")
            .replace(/_lt/, " below")
            .replace(/_/, " ")}
        </FormLabel>
        <Input size="xs" {...field} {...props} />
      </InputGroup>
      <FormErrorMessage
        fontSize="xs"
        mt={{ base: 0, sm: "1%" }}
        justifyContent="end"
      >
        {meta.error}
      </FormErrorMessage>
    </FormControl>
  );
};

export const StoreFilters = ({ initialFilters }: any) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const paramsController = new URLSearchParams(initialFilters);
  let apiQueryFilters = [
    //"Alcohol by volume"
    "abv_gt",
    "abv_lt",
    //"Internal Business Unit"
    "ibu_gt",
    "ibu_lt",
    //"European Brewery Convention": [
    "ebc_gt",
    "ebc_lt",
    "beer_name",
    //"yeast",
    "brewed_before",
    "brewed_after",
    "hops",
    "malt",
    "food",
    //"ids",
  ];
  let formValues: any = {};
  apiQueryFilters.forEach((filter) => {
    formValues[filter] = paramsController.get(filter) || "";
  });
  React.useEffect(() => {
    console.log(initialFilters, paramsController.toString());
  }, []);

  return (
    <Formik
      initialValues={formValues}
      enableReinitialize
      validationSchema={Yup.object({
        abv_gt: Yup.string().matches(/^\d+$/, "Only positive numbers"),
        abv_lt: Yup.string().matches(/^\d+$/, "Only positive numbers"),
        ibu_gt: Yup.string().matches(/^\d+$/, "Only positive numbers"),
        ibu_lt: Yup.string().matches(/^\d+$/, "Only positive numbers"),
        ebc_gt: Yup.string().matches(/^\d+$/, "Only positive numbers"),
        ebc_lt: Yup.string().matches(/^\d+$/, "Only positive numbers"),
        beer_name: Yup.string().matches(
          /^\S+$/,
          "Use underscores (_) instead of spaces"
        ),
        brewed_before: Yup.string().matches(
          /^\d{2}-\d{4}$/,
          "The date format is mm-yyyy e.g 10-2011"
        ),
        brewed_after: Yup.string().matches(
          /\d{2}-\d{4}/,
          "The date format is mm-yyyy e.g 10-2011"
        ),
        hops: Yup.string().matches(
          /^\S+$/,
          "Use underscores (_) instead of spaces"
        ),

        malt: Yup.string().matches(
          /^\S+$/,
          "Use underscores (_) instead of spaces"
        ),

        food: Yup.string().matches(
          /^\S+$/,
          "Use underscores (_) instead of spaces"
        ),
      })}
      onSubmit={(values) => {
        paramsController.set("page", "1"); // always search first page
        Object.entries(values).forEach(([key, value]) => {
          value
            ? paramsController.set(key, value as string)
            : paramsController.delete(key);
        });
        const newFilters = `?${paramsController.toString()}`;
        dispatch(getBeersFilteredBy({ filters: newFilters })).then(() =>
          history.push(`/beers${newFilters}`)
        );
      }}
    >
      <Grid
        h="min-content"
        mx="1.5%"
        w="97.5%"
        my="2.5%"
        px="1%"
        name="filtersForm"
        id="filtersForm"
        as={Form}
        templateColumns="repeat(1, fit)"
        columnGap={2}
        gridAutoFlow="dense"
        border="1px solid #333"
        rounded="md"
      >
        {apiQueryFilters.map((filter) => (
          <FilterInput
            key={`filter${filter}`}
            variant="flushed"
            borderColor={"#3335"}
            w="50%"
            label={filter}
            name={filter}
            type="text"
          />
        ))}
        <Button
          gridColumnStart={2}
          display="block"
          bgColor="#333"
          color="gray.50"
          form="filtersForm"
          w="100%"
          my="5%"
          type="submit"
          size="xs"
        >
          Apply Filters
        </Button>
      </Grid>
    </Formik>
  );
};
