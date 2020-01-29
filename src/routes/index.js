import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../pages/Events";
import Event from "../pages/Event";
import SignUp from "../pages/SignUp";
import AdminDashboard from "../pages/AdminDashboard";
import Navbar from "../components/NavBar";
import AboutUs from "../pages/about";
import Contact from "../pages/contact";
import Login from "../pages/Login";
import NewEvent from "../pages/NewEvent";
import CreateEventWizardForm from "../pages/CreateEventWizardForm";
import NewPresenter from "../pages/NewPresenter";
import EditEvent from "../pages/EditEvent";
import AdminAccount from "../components/adminAccount";

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
          <PrivateRoute
            exact
            path="/create-event"
            component={CreateEventWizardForm}
          />
          <PrivateRoute exact path="/edit-event/:index" component={EditEvent} />
          <Route exact path="/new-event" component={NewEvent} />
          <PrivateRoute exact path="/admin" component={AdminDashboard} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            exact
            path="/create-presenter"
            component={NewPresenter}
          />
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
