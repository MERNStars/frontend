import React, { Component } from "react";
import ContactForm from "../components/contactform";
import axios from "axios";
require('dotenv').config()

export default class Contact extends Component {
  submit = data => {
    console.log(data);
    // console.log(process.env.REACT_APP_BACKEND_DB_URL)
    // axios
    //   .post(`${process.env.REACT_APP_BACKEND_DB_URL}/email`, data)
    //   .then(response => {
    //     console.log(response.data);
    //   });
  };

  render() {
    return (
      <div>
        <ContactForm onSubmit={this.submit} />
      </div>
    );
  }
}
