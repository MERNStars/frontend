import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../pages/Events";
import Event from "../pages/Event";
import SignUp from "../pages/SignUp";
import AdminDashboard from "../pages/AdminDashboard";
import Navbar from "../components/NavBar";
import AboutUs from "../pages/about";
import Contact from "../pages/contact";
import Login from "../pages/Login";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path={`/events/:id`} component={Event} />
          <Route exact path="/about-us" component={AboutUs} />
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
