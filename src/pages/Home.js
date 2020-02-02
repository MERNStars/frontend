import React, { Component } from 'react'
import { NotificationManager } from "react-notifications";

export default class Home extends Component {
  async componentDidMount() {
    if(localStorage.message) {
      NotificationManager.success(null, localStorage.message);
      localStorage.removeItem("message");
    }
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
}
