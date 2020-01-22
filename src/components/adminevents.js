import React, { Component } from "react";
import AdminEventCard from "../components/adminEventCards";
import styles from "../styles/admin.module.scss";


export default class AdminEvents extends Component {

  createEvent() {
    // Insert code to create a new event. 
  }

  editEvent = () => {
    // Insert code to grab event with axios call and patch event. 
  }

  deleteEvent = () => {
    // Insert code to grab event with axios call and delete event. 
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
                return <AdminEventCard {...event} index={i} />;
              })
            : null}
        </div>
      </>
    );
  }
}

