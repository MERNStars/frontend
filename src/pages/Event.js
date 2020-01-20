import React from 'react';
import Axios from 'axios';

class Event extends React.Component {

  

  
  
  render(){
    console.log( this.props.location.eventProps )
    return(
      <h1>Hello World</h1>
    )
  }
}

export default Event

