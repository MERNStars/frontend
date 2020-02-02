import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import LoginForm from '../components/LoginForm';
import Logout from '../components/Logout';
import storageClear from '../components/storageclear'

function mapStateToProps(state){
    return {message: state.userReducer.message, userLoggedIn: state.userReducer.userLoggedIn}
}

class Login extends Component {
  componentDidMount() {
    storageClear()
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