import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoginForm from "../components/Users/LoginForm";
import Logout from "../components/Users/Logout";
import ClearMessageLocalStorage from "../components/Common/ClearMessageLocalStorage";
import styles from '../styles/form.module.scss';
import {Segment, Button} from 'semantic-ui-react';

function mapStateToProps(state) {
  return {
    message: state.userReducer.message,
    userLoggedIn: state.userReducer.userLoggedIn
  };
}

class Login extends Component {
  componentDidMount() {
    ClearMessageLocalStorage();
  }
  renderForm() {
    const { userLoggedIn } = this.props;
    if (userLoggedIn || localStorage.weexplore_token) return <Logout />;
    else return (
    
    <Segment id={styles.LoginFormSegment} raised color='green'><LoginForm /></Segment>);
  }
  render() {
    return (
      <>
        <div className={styles.LoginForm}>
          {this.renderForm()}
        {localStorage.weexplore_token ? null : (
          <div>
            <Link to="/signup">
              <br /><h3>New to weExplore? <Button id={styles.SignUpButton} color='green'>Sign Up</Button></h3>
            </Link>
          </div>
        )}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(Login);
