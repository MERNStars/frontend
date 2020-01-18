import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../pages/Events";
import Event from "../pages/Event";
import SignUp from "../pages/SignUp";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
