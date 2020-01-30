import React, { Component } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

class PassResetForm extends Component{

    state = {
        password: '',
        confirm_password: '',
        warning: '',
        message: "Please, enter your new password and confirm it.",
        success: false
    }

    updatePassword = e => {
        this.setState({password: e.target.value});
    }

    updateConfirmPassword = e => {
        this.setState({confirm_password: e.target.value});
        if(!this.passwordConfirmed())
            this.setState({warning: "*password must match"});
        else
            this.setState({warning: ""});

    }

    passwordConfirmed = () => {
        if(this.state.password === this.state.confirm_password)
            return true;
        return false;
    }

    submit = () => {
        if(this.passwordConfirmed()){
            const urlParts = window.location.href.split('/');
            // console.log(urlParts);
            const uniqueKey = urlParts[urlParts.length - 1];
        
            axios.post(`${process.env.REACT_APP_BACKEND_DB_URL}/password/reset`, {password: this.state.password, uniqueKey: uniqueKey})
            .then(result=>{
                console.log(result);
                if(result.success){
                    this.setState({success: true, message: "Thank you.  Your password has been updated."});
                }
                else{
                    this.setState({ message: result.message });
                }
            })
            .catch(err => {
                this.setState({message: "We are not sure what went wrong, but we couldn't update your password."});
            })
        }
        
    }

    render(){
        const form = <div className="Container">
        <h2>{this.state.message}</h2>
        <label>Password: </label>
        <input
            name="password"
            type="password"
            onChange={this.updatePassword}
        /><br/>
        <label>Confirm password: </label>
        <input
            name="confirm_password"
            type="password"
            onChange={this.updateConfirmPassword}
        /><label>{this.state.warning}</label><br/>
        <button className="btnSubmit" type="submit" onClick={this.submit}>Submit</button>
        </div>;
        const confirmation = <div className="Container">
            <h2>{this.state.message}</h2>
        </div>
        return this.state.success? confirmation : form;
    }
}

export default PassResetForm;
