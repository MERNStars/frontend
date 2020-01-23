import React, { Component } from "react";
import AdminEventCard from "../components/adminEventCards";
import styles from "../styles/admin.module.scss";
import Axios from 'axios';

require('dotenv').config()


export default class AdminEvents extends Component {

  state = {
    selectedEvent: null,
  }

  setSelectedEvent = event => {
    this.setState( {selectedEvent: event})
  }

  createEvent() {
    // Insert code to create a new event. 
  }

  editEvent = event => {
    this.setState( {selectedEvent: event })
    // Render "eventForm"
    // Insert code to grab event with axios call and patch event. 
  }

  deleteEvent = async(event) => {
    this.setState( {selectedEvent: event}) 
    const response = await Axios.delete(`${process.env.REACT_APP_BACKEND_DB_URL}/events/delete/${this.state.selectedEvent._id}`)
    .catch( (err) => {
      console.log( `Error: ${err}`)
    })
    console.log( response.data )
  }

  publishEvent = () => {
    // Insert code to grab event with axios and change event status from unpublished to publish
  }

  render() {
    return (
      <>
        <h1>Events</h1>
        <h3>Published Events</h3>
        <div className={styles.eventsContainer}>
          {this.props.events
            ? this.props.events.map((event, i) => {
                return <AdminEventCard {...event} index={i} deleteEvent={this.deleteEvent} editEvent={this.editEvent} />;
              })
            : null}
        </div>
      </>
    );
  }
}

