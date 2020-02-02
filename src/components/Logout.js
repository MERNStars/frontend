import React, { Component } from "react";
import { connect } from "react-redux";
import { logUserOut } from "../reducers/user_reducer";
import { Button } from "semantic-ui-react";

function mapStateToProps(state) {
  return {
    message: state.userReducer.message,
    userLoggedIn: state.userReducer.userLoggedIn,
    token: state.userReducer.token,
    isAdmin: state.userReducer.isAdmin
  };
}

class Logout extends Component {
  logout = () => {
    this.props.logout();
    if (typeof Storage !== "undefined") {
      localStorage.removeItem("weexplore_token");
      localStorage.removeItem("username");
      window.location.href = "/";
    }

  };

  render() {
    return (
      <div>
        <Button onClick={this.logout}>Logout</Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logUserOut());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
