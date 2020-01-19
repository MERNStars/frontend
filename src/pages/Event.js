import React from 'react';
import styles from '../styles/event.module.scss';
import Moment from 'react-moment';

class Event extends React.Component {


  render() {
    console.log( this.props)
    const { event_name, event_date } = this.props
    return(
      <div className = {styles.eventCard}>
        <div className = {styles.eventDate}><sub><Moment format="D MMM">{event_date.begin}</Moment></sub></div>
        <h1> {event_name}</h1>
      </div>
    )
  }

}

export default Event

