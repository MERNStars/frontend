import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div>
        <NavLink exact to="/">
          Home
        </NavLink>
      </div>
      <div>
        <NavLink exact to="/events">
          Events
        </NavLink>
      </div>
      <div>
        <NavLink exact to="/signup">
          Sign Up
        </NavLink>
      </div>
      <div>
        <NavLink exact to="/about-us">
          About Us
        </NavLink>
      </div>
      <div>
        <NavLink exact to="/contact">
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
