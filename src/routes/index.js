import React from "react";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../pages/Events";
import Event from "../pages/Event";
import SignUp from "../pages/SignUp";
import AdminDashboard from "../pages/AdminDashboard";
import Navbar from "../components/NavBar/NavBar";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/contact";
import Login from "../pages/Login";
import CreateEvent from "../pages/CreateEvent";
import NewPresenter from "../pages/NewPresenter";
import EditEvent from "../pages/EditEvent";
import PassRequest from "../pages/PassRequest";
import PassReset from "../pages/PassReset";
import AdminAccount from "../components/AdminDashboard/adminAccount";
import EditAccountDetails from "../pages/EditAccount";

const NoMatch = ({ location }) => (
  <div>
    <h2>
      404 ERROR..BEEP..BOOP...BEEP! No Routes Matching{" "}
      <code>{location.pathname}</code>
    </h2>

    <Link exact to="/">
      <h3>Return To Home Page</h3>
    </Link>
  </div>
);

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
          <PrivateRoute exact path="/create-event" component={CreateEvent} />
          <PrivateRoute exact path="/edit-event/:index" component={EditEvent} />
          <PrivateRoute exact path="/admin" component={AdminDashboard} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/create-presenter" component={NewPresenter} />
          <Route exact path="/passrequest" component={PassRequest} />
          <Route exact path="/passreset/:uniqueKey" component={PassReset} />
          <PrivateRoute
            exact
            path="/create-presenter"
            component={NewPresenter}
          />
          <Route exact path="/edit-account" component={EditAccountDetails} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

const PrivateRoute = ({ component: Component, ...props }) => {
  let result = AdminAccount();
  return (
    <Route
      {...props}
      render={innerProps =>
        result ? <Component {...innerProps} /> : <Redirect to="/" />
      }
    />
  );
};

export default Router;
