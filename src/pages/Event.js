import React from 'react';

class Event extends React.Component {


  render() {
    console.log( this.props)
    return(
      <div className = "event-card">
        <h1> {this.props.event_name}</h1>
      </div>
    )
  }

}

export default Event