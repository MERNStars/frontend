import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../pages/Events";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/events" component={Events} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
