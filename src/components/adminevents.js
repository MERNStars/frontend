import React, { Component } from "react";
import EventCard from "../components/eventCard";
import styles from "../styles/admin.module.scss";

export default class AdminEvents extends Component {
  render() {
    return (
      <>
        <h1>Events</h1>
        <div className={styles.eventsContainer}>
          {this.props.events
            ? this.props.events.map((event, i) => {
                return <EventCard {...event} index={i} />;
              })
            : null}
        </div>
      </>
    );
  }
}

