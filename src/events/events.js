import React from 'react';
import axios from 'axios';
import Event from './event';

class Events extends React.component {

  state = {
    events: []
  }
  
  

  async componentDidMount() {
    const response = await axios.get('https://weexplorebackend.herokuapp.com/events').catch( (error) => {
      console.log( `ERROR: ${error}` )
    })
    const data = await response.data 
    this.setState( { events: data });
  }

  renderEventCard = () => {
    return this.state.events.map( (event) => {
      return ( <Event 
      { ...event} />
    )})
  }

  render() {
    return(
      <div className="events">
        {this.renderEventCard()}
      </div>
    )
  }
}

export default Events 