import React, { Component } from "react";
import UserSignUpForm from "../components/Users/SignUpForm";
import { connect } from "react-redux";
import { createUser } from "../reducers/user_reducer";
import { Redirect } from "react-router-dom";

function mapStateToProps(state) {
  return {
    message: state.userReducer.message,
    userLoggedIn: state.userReducer.userLoggedIn
  };
}

class SignUp extends Component {
  state = {
    display_message: "Sign Up",
    redirect: false
  };

  submit = data => {
    console.log(data);
    this.props.createUser(data);
  };

  redirectToLogin = () => {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
  };

  render() {
    return (
      <div>
        {this.redirectToLogin()}
        <h1>{this.state.display_message}</h1>
        <UserSignUpForm onSubmit={this.submit} />
      </div>
    );
  }
}

//Things to implement
const mapDispatchToProps = dispatch => {
  return {
    createUser: userData => {
      dispatch(createUser(userData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
