import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import LoginForm from '../components/LoginForm';
import Logout from '../components/Logout';

function mapStateToProps(state){
    return {message: state.userReducer.message, userLoggedIn: state.userReducer.userLoggedIn}
}

class Login extends Component {
    renderForm(){
        const {userLoggedIn} = this.props;
        console.log(userLoggedIn, localStorage.weexplore_token);
        
        if(userLoggedIn || localStorage.weexplore_token)
            return <Logout />;
        else
            return <LoginForm />;
    }
  render() {
  return <>
    <div>{this.renderForm()}</div>
    <div><Link to="/signup"><button>Sign Up</button></Link></div>
  
  
  </>;
  }
}


export default connect(mapStateToProps)(Login);