import React, { Component } from "react";
import RequestPasswordForm from "../components/Users/RequestPasswordForm";
import styles from '../styles/form.module.scss';
import {Segment} from 'semantic-ui-react';

class PassRequest extends Component {
  render() {
    return (
      <div className={styles.LoginForm}>
        <Segment id={styles.LoginFormSegment} raised color='green'><RequestPasswordForm /></Segment>
      </div>
    );
  }
}

export default PassRequest;
