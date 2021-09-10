import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { beersService } from "./services/beers";
import { Beer as IBeer } from "./types/beer";
import { BeerView } from "./pages/BeerView";
import { GroceryView } from "./pages/GroceryView";
export const App = () => {
  const [test, setTest] = React.useState<IBeer[] | []>([]);
  React.useEffect(() => {
    //beersService.random().then((response) => setTest(response.data));
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          path="/beers_"
          render={({ location, match }) => (
            <GroceryView children={location.search} />
          )}
        />
        <Route
          exact
          path="/"
          render={() => <Redirect to="beers_?page=1&per_page=12" />}
        />
        <Route exact path="/cart" render={() => "Cart page"} />
        <Route
          exact
          path={["/login", "/register"]}
          render={() => "A Login or Register form"}
        />
        <Route exact path="/contact" render={() => "Contact page"} />
        <Route
          exact
          path="/beers/:id"
          render={({ match }) => <BeerView BeerId={match.params.id} />}
        />
        <Route render={() => "Not found page"} />
      </Switch>
    </Router>
  );
};
