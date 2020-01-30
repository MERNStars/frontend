import React, { Component } from "react";
import axios from 'axios';
require("dotenv").config();

class RequestPasswordForm extends Component{

    state = {
        email: 'Please, enter your email to request a password reset.',
        message: '', 
        submitted: false
    }

    submit = () =>{

        axios.post(`${process.env.REACT_APP_BASE_URL}/password/request`, { email: this.state.email })
        .then(result => {
            this.setState({message: result.message, submitted: true});
        })
        .catch(err => {
            this.setState({message: "Something went wrong.  Please, try again."})
        });
    }

    updateEmail = e => {
        this.setState({email: e.target.value});
    }

    renderForm(){
        const form = <div>
            <h1>{this.state.message}</h1>
            <label>Email:</label>
            <input type="email" placeholder="john.doe@email.com" onChange={this.updateEmail} />
            <button className="btnSubmit" type="submit" onClick={this.submit}>Submit</button>
        </div>

        const message = <>
            <h2>Request submitted</h2>
            <h3>{this.state.message}</h3>
        </>;

        return (this.state.submitted? message : form);
    }

    render(){
        return this.renderForm();
    }
}

export default RequestPasswordForm;