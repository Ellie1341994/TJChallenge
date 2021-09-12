import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { BeerView } from "./pages/BeerView";
import { AuthView } from "./pages/AuthView";
import { GroceryView } from "./pages/GroceryView";
export const App = () => {
  const isAuthenticated = localStorage.getItem("fakeToken");
  React.useEffect(() => {
    //return localStorage.removeItem("fakeToken");
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          path="/beers"
          render={({ location }) => <GroceryView children={location.search} />}
        />
        <Route
          exact
          path="/"
          render={() => <Redirect to="beers?page=1&per_page=12" />}
        />
        <Route
          exact
          path="/cart"
          render={({ location }) =>
            isAuthenticated ? (
              "Cart page"
            ) : (
              <Redirect to={`/login?from=${location.pathname}`} />
            )
          }
        />
        <Route
          exact
          path={["/login", "/register"]}
          render={({ location }) =>
            isAuthenticated ? (
              <Redirect to="/" />
            ) : (
              <AuthView
                type={location.pathname}
                to={
                  new URLSearchParams(location.search).get("from") ?? "/store"
                }
              />
            )
          }
        />
        <Route exact path="/contact" render={() => "Contact page"} />
        <Route
          exact
          path="/beer/:id"
          render={({ match }) => <BeerView beerId={match.params.id} />}
        />
        <Route render={() => "Not found page"} />
      </Switch>
    </Router>
  );
};
