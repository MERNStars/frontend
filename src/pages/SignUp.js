import React, { Component } from "react";
// import UserSignUpForm from "../components/usersignupform";
import UserSignUpForm from "../components/SignUpForm";

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
