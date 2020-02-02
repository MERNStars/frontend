import React from 'react';
import axios from 'axios';
import { Table, Checkbox } from 'semantic-ui-react'; 

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
    console.log( this.state.attendees)
    return (
        <Table>
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Attendee</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Friends</Table.HeaderCell>
              <Table.HeaderCell>Dependents</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body> {this.state.attendees.map( (attendee) => {
              return(
              <Table.Row>
                <Table.Cell collapsing>
                  <Checkbox /></Table.Cell>
                <Table.Cell>{attendee.first_name} {attendee.last_name}</Table.Cell>
                <Table.Cell>{attendee.username}</Table.Cell>
                <Table.Cell>{attendee.friends.map( (friend) => {
                  return (<li>{friend}</li>)})}</Table.Cell>
                <Table.Cell>{attendee.dependents.map( (child) => {
                  return `${child.name}(${child.age}) `})}</Table.Cell>
              </Table.Row> )})}
            </Table.Body>
          </Table>)
  }

  render(){
    return this.state.attendees ? this.renderAttendees() : null
  }
}

export default eventAttendeesList