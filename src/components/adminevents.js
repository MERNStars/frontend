import React, { Component } from "react";
import AdminEventCard from "../components/adminEventCards";
import EditEvent from "../components/editEvent";
import styles from "../styles/admin.module.scss";


require('dotenv').config()


export default class AdminEvents extends Component {

  createEvent() {
    // Insert code to create a new event. 
  }

  editEvent = event => {
    this.setState( {selectedEvent: event })
    return(
      <EditEvent {...event}/>
      )
    // Render "eventForm"
    // Insert code to grab event with axios call and patch event. 
  }
    

  publishEvent = () => {
    // Insert code to grab event with axios and change event status from unpublished to publish
  }

  render() {
    return (
      <>
        <h3>Published Events</h3>
        <div className={styles.eventsContainer}>
          {this.props.events
            ? this.props.events.map((event, i) => {
                return <AdminEventCard {...event} index={i} />;
              })
            : null}
        </div>
      </>
    );
  }
}

