import * as React from "react";
import { Footer } from "../components/Footer";
import { MainHeader } from "../components/MainHeader";
export const PagesBase = ({ children }: { children: any }) => {
  return (
    <>
      <MainHeader />
      {children}
      <Footer />
    </>
  );
};
