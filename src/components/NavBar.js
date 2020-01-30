import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Menu, Dropdown } from "semantic-ui-react";
import AdminAccount from "../components/adminAccount";

function mapStateToProps(state) {
  return { userLoggedIn: state.userReducer.userLoggedIn };
}

class Navbar extends React.Component {
  render() {
    let result = AdminAccount();
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
        {localStorage.username ? (
          <Dropdown text="Account" simple item>
            <Dropdown.Menu>
              <Dropdown.Item>
                <NavLink exact to="/edit-account">
                  Edit Account Details
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink exact to="/login">
                  Log Out
                </NavLink>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Menu.Item>
            <NavLink exact to="/login">
              Log In
            </NavLink>
          </Menu.Item>
        )}
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
        {result ? (
          <Menu.Item>
            <NavLink exact to="/admin">
              Admin
            </NavLink>
          </Menu.Item>
        ) : null}
      </Menu>
    );
  }
}

export default connect(mapStateToProps)(Navbar);
