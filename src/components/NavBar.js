import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

function mapStateToProps(state) {
  return { userLoggedIn: state.userReducer.userLoggedIn };
}

class Navbar extends React.Component {
  render() {
    console.log(this.props.userLoggedIn);
    return (
      <Menu>
        <Menu.Item>
          <NavLink exact to="/">
            Home
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink exact to="/events">
            Events
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          {this.props.userLoggedIn ? (
            <NavLink exact to="/login">
              Log Out
            </NavLink>
          ) : (
            <NavLink exact to="/login">
              Log In
            </NavLink>
          )}
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
        <Menu.Item>
          <NavLink exact to="/admin">
            Admin
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

export default connect(mapStateToProps)(Navbar);
