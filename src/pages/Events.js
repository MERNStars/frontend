import React, { Component } from 'react'
import axios from 'axios';
import styles from '../styles/events.module.scss';

import EventCard from '../components/eventCard';
import SearchBar from '../components/searchBar';


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

  categorySearch = (events) => {
    this.setState( {events: events});
  }

  eventsError() {
    return(
      <div className={styles.errorContainer}>
        <h1> Oops! No events found</h1>
      </div>
    )
  }

  render() {
    const {events} = this.state
    return(
      <div className={styles.Main}>
      <h1>All Events</h1>
      <SearchBar categorySearch={this.categorySearch}/>
      <>
        {events.length > 0 ? 
         <div className={styles.eventContainer}>
         {events && events.map( (event, i) => {
           if( event.published && event.status !== "completed" ){
             return(< EventCard 
               { ...event} 
               index={i}/>)
           }
         })}
          </div> : this.eventsError()}
      </>
      </div>
    )
  }
}
