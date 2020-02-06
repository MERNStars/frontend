import React, { Component } from "react";
import PassResetForm from "../components/Users/PassResetForm";
import styles from '../styles/form.module.scss';
import {Segment} from 'semantic-ui-react';

class PassRequest extends Component {
  render() {
    return <div className={styles.LoginForm}><Segment id={styles.LoginFormSegment} raised color='green'><PassResetForm /></Segment></div>;
  }
}

export default PassRequest;
