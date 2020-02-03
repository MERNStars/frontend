import React, { Component } from 'react'
import storageClear from '../components/storageclear'

export default class Home extends Component {
  async componentDidMount() {
    storageClear()
  }
  

  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
}
