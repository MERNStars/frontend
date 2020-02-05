import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Dropdown, Button } from "semantic-ui-react";
import AdminAccount from "../AdminDashboard/adminAccount";
import Logout from '../Users/Logout';
import styles from '../../styles/navbar.module.scss';

class Navbar extends React.Component {

  render() {
    let result = AdminAccount();
    return (
      <Menu borderless size="huge" id={styles.Navbar}>
        <Menu.Menu position="left">
        <Menu.Item>
          <NavLink exact to="/">
            <h1>weExplore</h1>
          </NavLink>
        </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
        <Menu.Item>
          <NavLink exact to="/events">
            <Button color='green'>Events</Button>
          </NavLink>
        </Menu.Item>
        <Menu.Item >
          <NavLink exact to="/about-us">
            About Us
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink exact to="/contact">
            Contact
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
                <Logout />
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
        {result ? (
          <Menu.Item>
            <NavLink exact to="/admin">
              Admin
            </NavLink>
          </Menu.Item>
        ) : null}
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Navbar;
