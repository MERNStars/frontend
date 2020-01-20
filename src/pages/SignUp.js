import React, { Component } from "react";
// import UserSignUpForm from "../components/usersignupform";
import UserSignUpForm from "../components/SignUpForm";

export default class SignUp extends Component {
  submit = data => {
    console.log(data);
  
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <UserSignUpForm  onSubmit={this.submit}/>
      </div>
    );
  }
}
