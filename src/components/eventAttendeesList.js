import React from 'react';
import axios from 'axios';

class eventAttendeesList extends React.Component {

  state = {
    attendees: [],
    friends: [],
    dependents: []
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
    this.setState( { attendees: response.data})
    console.log( this.state.attendees)
  }

  render(){
    return(
      <>
        {this.state.attendees.map( (attendee) => {
          return(
            <div>
              <strong>{attendee.first_name} {attendee.last_name}</strong><br></br>
              Friends: {attendee.friends.map( (friend) => {
                return (<>{friend} </>)
              })}<br></br>
              Dependents: {attendee.dependents.map( (child) => {
                return ( <>{child.name} {child.age}</> ) 
              })}
            </div>
          )
        })}
      </>
    )
  }
}

export default eventAttendeesList