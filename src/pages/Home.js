import React, { Component } from 'react'
import ClearMessageLocalStorage from "../components/Common/ClearMessageLocalStorage";

export default class Home extends Component {
  async componentDidMount() {
    ClearMessageLocalStorage()
  }
  

  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
}
