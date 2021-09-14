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
import { StoreView } from "./pages/StoreView";
import { NotFoundView } from "./pages/NotFoundView";
import { CartView } from "./pages/CartView";
export const App = () => {
  React.useEffect(() => {
    //return localStorage.removeItem("fakeToken");
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path={["/", "/beers"]}
          render={({ location }) =>
            /beers$/.test(location.pathname) && location.search ? (
              <StoreView filters={location.search} />
            ) : (
              <Redirect to="beers?page=1&per_page=12" />
            )
          }
        />
        <Route
          exact
          path="/cart"
          render={({ location, match }) =>
            localStorage.getItem("fakeToken") ? (
              <CartView />
            ) : (
              <Redirect to={`/login?from=${location.pathname}`} />
            )
          }
        />
        <Route
          exact
          path={["/login", "/register"]}
          render={({ location }) =>
            localStorage.getItem("fakeToken") ? (
              <Redirect to="/" />
            ) : (
              <AuthView
                type={location.pathname}
                to={new URLSearchParams(location.search).get("from") ?? "/"}
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
        <Route
          render={({ location }) => (
            <NotFoundView
              title="Beer not found!"
              message={`${location.pathname} was not found`}
            />
          )}
        />
      </Switch>
    </Router>
  );
};
