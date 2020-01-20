import React, { Component } from 'react'
import {connect} from 'react-redux';
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
    return this.renderForm();
  }
}


export default connect(mapStateToProps)(Login);