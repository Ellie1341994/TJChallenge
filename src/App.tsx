import * as React from "react";
import { Counter } from "./features/counter/Counter";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
export const App = () => {
  return (
    <Router>
      <Switch>
        {/*Main page with filters and products*/}
        <Route exact path="/" children={() => "hola"} />
        {/*Shopping cart*/}
        <Route exact path="/cart" children={() => "hola"} />
        {/*Contact page*/}
        <Route exact path="/contact" children={() => "hola"} />
        {/*Product item page*/}
        <Route exact path="/item/:id" children={() => "hola"} />
      </Switch>
    </Router>
  );
};
