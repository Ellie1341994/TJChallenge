import * as React from "react";
import { Footer } from "../components/Footer";
import { MainHeader } from "../components/MainHeader";
export const PageBase = ({ children }: { children: any }) => {
  return (
    <>
      <MainHeader />
      {children}
      <Footer />
    </>
  );
};
