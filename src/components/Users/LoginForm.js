import React, { Component } from "react";
import { userLogin } from "../../reducers/user_reducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from '../../styles/form.module.scss';

function mapStateToProps(state) {
  return {
    message: state.userReducer.message,
    userLoggedIn: state.userReducer.userLoggedIn
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: userData => {
      dispatch(userLogin(userData));
    }
  };
};

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

  login = () => {
    this.props.login({
      username: this.state.username,
      password: this.state.password
    });
  };
  render() {
    return (
      <div>
        <h2>Login to your weExplore account</h2>
        <input
          type="text"
          placeholder="Your username or email"
          onChange={this.updateUsername}
        /><br />
        <input
          type="password"
          placeholder="Your password"
          onChange={this.updatePassword}
        /><br />
        <button className={styles.SubmitButton}onClick={this.login}>Login</button>
        <Link to="/passrequest">Click here if you forgot your password</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
