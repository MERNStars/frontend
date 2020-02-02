import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import LoginForm from '../components/LoginForm';
import { NotificationManager } from "react-notifications";
import Logout from '../components/Logout';

function mapStateToProps(state){
    return {message: state.userReducer.message, userLoggedIn: state.userReducer.userLoggedIn}
}

class Login extends Component {
  componentDidMount() {
    if(localStorage.message) {
      NotificationManager.info(null, localStorage.message);
      localStorage.removeItem("message");
    }
  }

    renderForm(){
        const {userLoggedIn} = this.props;
        if(userLoggedIn || localStorage.weexplore_token)
            return <Logout />;
        else
            return <LoginForm />;
    }
  render() {
  return <>
    <div>{this.renderForm()}</div>
    {localStorage.weexplore_token ? null : <div><Link to="/signup"><button>Sign Up</button></Link></div>}
  </>;
  }
}


export default connect(mapStateToProps)(Login);