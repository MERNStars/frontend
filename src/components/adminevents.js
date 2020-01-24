import React, { Component } from "react";
import AdminEventCard from "../components/adminEventCards";
import EditEvent from "../components/editEvent";
import styles from "../styles/admin.module.scss";


require('dotenv').config()


export default class AdminEvents extends Component {

  state = {
    publishedEvents: null,
    unpublishedEvents: [],
    pastEvents: []
  }

  componentDidMount() {
    let publishArray = this.props.events.filter( event => event.published === true )
    this.setState( { publishedEvents: publishArray})
    console.log( this.state.publishedEvents)
  }

  editEvent = event => {
    return(
      <EditEvent {...event}/>
      )
  }
    
  render() {
    console.log( this.state.publishedEvents)
    return (
      <>
      <h3>Published Events</h3>
        <div className={styles.eventsContainer}>
          {this.state.publishedEvents
            ? this.state.publishedEvents.map((event, i) => {
                return (  <AdminEventCard {...event} index={i} /> )})
            : null}
        </div>
        <h3>Unpublished Events</h3>
        <div className={styles.eventsContainer}>
          {this.props.events
            ? this.props.events.map((event, i) => {
                return ( event.published ? null : <AdminEventCard {...event} index={i} /> )})
            : null}
        </div>
      </>
    );
  }
}

