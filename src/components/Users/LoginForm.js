import React, { Component } from "react";
import { userLogin } from "../../reducers/user_reducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function mapStateToProps(state) {
  return {
    message: state.userReducer.message,
    userLoggedIn: state.userReducer.userLoggedIn
  };
}

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };

  updateUsername = e => {
    this.setState({ username: e.target.value });
  };

  updatePassword = e => {
    this.setState({ password: e.target.value });
  };

  //things to implement
  login = () => {
    // console.log(this.state.username, this.state.password);
    this.props.login({
      username: this.state.username,
      password: this.state.password
    });
  };
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Your username or email"
          onChange={this.updateUsername}
        />
        <input
          type="password"
          placeholder="Your password"
          onChange={this.updatePassword}
        />
        <button onClick={this.login}>Login</button>
        <Link to="/passrequest">forgot password</Link>
      </div>
    );
  }
}

//Things to implement
const mapDispatchToProps = dispatch => {
  return {
    login: userData => {
      dispatch(userLogin(userData));
    }
  };
};

//Things to implement
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
