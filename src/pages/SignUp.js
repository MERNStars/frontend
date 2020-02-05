import React, { Component } from "react";
import UserSignUpForm from "../components/Users/SignUpForm";
import { connect } from "react-redux";
import { createUser } from "../reducers/user_reducer";
import { Redirect } from "react-router-dom";
import styles from '../styles/form.module.scss';
import {Segment} from 'semantic-ui-react';

function mapStateToProps(state) {
  return {
    message: state.userReducer.message,
    userLoggedIn: state.userReducer.userLoggedIn
  };
}

class SignUp extends Component {
  state = {
    display_message: "weExplore Sign Up",
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
      <div className={styles.SignUpFormContainer}>
        {this.redirectToLogin()}
        <Segment id={styles.eventFormSegment} color='green'><h1>{this.state.display_message}</h1>
        <UserSignUpForm onSubmit={this.submit} /></Segment>
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
