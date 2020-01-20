import React from 'react';
import Axios from 'axios';

class Event extends React.Component {

  state = {
    event: null,
  }

  componentDidMount = async () => {
    const {id} = this.props.match.params
    const response = await Axios.get(`https://weexplorebackend.herokuapp.com/events/${id}/id`)
    const data = response.data
    this.setState({ event: data});
  }

  renderEvent = () => {
    const { event_name } = this.state.event
    return (
      <div>
        <h1>{event_name}</h1>
      </div>
    )
  }

  
  
  render(){
    console.log(this.state.event)
    return (
      <div>
        <h1>Hello World</h1>
        { this.state.event ? this.renderEvent() : null }
      </div>     
    )
  }
}

export default Event

