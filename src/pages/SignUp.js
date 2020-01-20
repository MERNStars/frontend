import React, { Component } from "react";
import UserSignUpForm from "../components/usersignupform";

export default class SignUp extends Component {

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <UserSignUpForm />
      </div>
    );
  }
}
