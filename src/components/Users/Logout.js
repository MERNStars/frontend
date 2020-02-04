import React, { Component } from "react";
import { connect } from "react-redux";
import { logUserOut } from "../../reducers/user_reducer";
import { Button } from "semantic-ui-react";

function mapStateToProps(state) {
  return {
    message: state.userReducer.message,
    token: state.userReducer.token,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logUserOut());
    }
  };
};


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


export default connect(mapStateToProps, mapDispatchToProps)(Logout);
