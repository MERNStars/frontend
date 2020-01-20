import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../pages/Events";
import Event from "../pages/Event";
import SignUp from "../pages/SignUp";
import AdminDashboard from "../pages/AdminDashboard";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/event" component={Event} />
          <Route exact path="/admin" component={AdminDashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
