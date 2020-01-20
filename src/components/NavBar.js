import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

class Navbar extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item>
          <NavLink exact to="/">
            Home
          </NavLink>
        </Menu.Item >
        <Menu.Item>
          <NavLink exact to="/events">
            Events
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink exact to="/login">
            Login In
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink exact to="/about-us">
            About Us
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink exact to="/contact">
            Contact
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Navbar;
