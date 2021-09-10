import * as React from "react";
import { PagesBase } from "./Base";

export const GroceryView = ({ children }: any) => {
  return <PagesBase children={() => children} />;
};
