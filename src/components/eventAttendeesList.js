import React from 'react';
import axios from 'axios';

class eventAttendeesList extends React.Component {

  state = {
    attendees: []
  }

  async componentDidMount() {
    const options = {
      method: "GET",
      headers: {
        authorization: `${localStorage.weexplore_token}`
      },
      url: `${process.env.REACT_APP_BACKEND_DB_URL}/events/${this.props._id}/attendees`
    };
    const response = await axios(options).catch(error => {
      console.log(`ERROR: ${error}`);
    });
    if( response !== undefined){
      this.setState( { attendees: response.data})
    }
  }

  renderAttendees() {
    return( <>
      {this.state.attendees.map( (attendee) => {
        return(
          <div>
            <strong>{attendee.first_name} {attendee.last_name}</strong><br></br>
            Friends: 
            <ul>
            {attendee.friends.map( (friend) => {
              return (<li>{friend} </li>)
            })}
            </ul>
            Dependents: 
            <ul>
            {attendee.dependents.map( (child) => {
              return ( <li>{child.name}, Age: {child.age}</li> ) 
            })}
            </ul>
          </div>
        )
      })}
    </>)
   
  }

  render(){
    return this.state.attendees ? this.renderAttendees() : null
  }
}

export default eventAttendeesList