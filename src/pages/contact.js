import React, { Component } from "react";
import ContactForm from "../components/contactform";
import axios from "axios";
import createNotification from '../components/notifications'
require('dotenv').config()

export default class Contact extends Component {
  submit = data => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_DB_URL}/email`, data)
      .then(response => {
        console.log(response.data);
      });
  };

  render() {
    return (
      <div>
        <ContactForm onSubmit={this.submit} />
      </div>
    );
  }
}
