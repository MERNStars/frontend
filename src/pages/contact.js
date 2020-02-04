import React, { Component } from "react";
import ContactForm from "../components/Contact/contactform";
import axios from "axios";
import styles from '../styles/events.module.scss';
import {Segment} from 'semantic-ui-react';
require("dotenv").config();

export default class Contact extends Component {

  state = {
    submitted: false
  }
  submit = data => {
    console.log(data)
    axios
      .post(`${process.env.REACT_APP_BACKEND_DB_URL}/email`, data)
      .then(response => {
        console.log(response);
        if(response.status === 200) 
          this.setState( {submitted: true})
      });
  };

  render() {
    return (
      <div className={styles.mainContainer}>
        <header>
          <h1>weExplore Contact</h1>
        </header>
        <div className={styles.mainContent}>
          {!this.state.submitted ? <Segment id={styles.contactSubmit} color='green' raised>Your query has been submitted<br />We will be in touch soon.</Segment> :
          <Segment color='green' raised><ContactForm onSubmit={this.submit} /></Segment>}
        </div>
      </div>
    );
  }
}
