import React, { Component } from 'react'
import axios from 'axios';
import styles from '../styles/events.module.scss';

import Event from './Event';



export default class Events extends Component {

  state = {
    events: []
  }

  async componentDidMount() {
    const response = await axios.get('https://weexplorebackend.herokuapp.com/events').catch( (error) => {
      console.log( `ERROR: ${error}` )
    })
    const data = await response.data 
    this.setState( {events: data })
  }


  render() {
    const {events} = this.state
    return(
      <div className="events">
      <h1>All Events</h1>
      <div className={styles.eventContainer}>
        {events ? events.map( (event) => {
          return (
            < Event 
              { ...event} /> 
          )
        }) : null}
        </div>
      </div>
    )
  }
}
