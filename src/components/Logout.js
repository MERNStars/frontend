import React, { Component } from "react";
import { connect } from "react-redux";
import { logUserOut } from "../reducers/user_reducer";

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
    // console.log(this.state.username, this.state.password);
    this.props.logout();
    if (typeof Storage !== "undefined") {
      localStorage.removeItem("weexplore_token");
      localStorage.removeItem("username");
    }
  };

  render() {
    // const {message} = this.props;
    return (
      <div>
        <button onClick={this.logout}>Logout</button>
        <div>{this.props.message}</div>
        <div>{this.props.isAdmin ? "You are an admin." : "You are not an admin."}</div>
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
