import React, { Component } from "react";
import ClearMessageLocalStorage from "../components/Common/ClearMessageLocalStorage";
import styles from "../styles/home.module.scss";
import {Button} from "semantic-ui-react";
import {NavLink} from 'react-router-dom';

export default class Home extends Component {
  async componentDidMount() {
    ClearMessageLocalStorage();
  }

  render() {
    return (
      <div className={styles.Home}>
        <h1>Welcome to <strong>weExplore</strong></h1>
        <h3>A community interested in healthy living</h3>
        <div className={styles.Buttons}>
          <NavLink exact to="/events"><Button color='green' size='huge'>exploreEvents</Button></NavLink>
          <NavLink exact to="/about-us"><Button color='green' size='huge'>exploreAbout</Button></NavLink>      
        </div>
      </div>
    );
  }
}
