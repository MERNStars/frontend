import React from 'react';
import { Card, Icon, Button, Modal } from 'semantic-ui-react'
import Moment from 'react-moment';
import AttendeeList from './eventAttendeesList';


class AdminEventCard extends React.Component {

  renderEvents(){
    return( this.props.published ? 
        this.displayCard( this.props ): null
      )
      
  }




  displayCard = event => {
    return(
      <Card>
        <Card.Content>
          <Card.Header>{event.event_name}</Card.Header>
          <Card.Meta>
            <span className='date'><Moment format="D MMM">{event.event_date.begin}</Moment></span>
          </Card.Meta>
          <Modal trigger={<Button basic><Icon name="user"/>Attending: {event.attendee_count}</Button>}>
              <Modal.Header>Attendees</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <AttendeeList {...event}/>
                </Modal.Description>
              </Modal.Content>
            </Modal>
        </Card.Content>
        <Card.Content extra>
          <Button size="small">Edit</Button>
          <Button size="small" onClick={this.handleSubmit}>Delete</Button>
          <Button size="small">Cancel</Button>
        </Card.Content>
      </Card>
    )
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.deleteEvent(this.props)
  }

  // Get attendees

  render() {
    
    return(
      <>
        {this.renderEvents()}
      </>
    )
  }

}

export default AdminEventCard


// To Do:
// - seperate them from published to unpublished
// - Show attendees button that displays all the members attending (print out option/ interactive list option?)
// 
//    - Make a delete request to the server
// 
//    - Make a patch request to the server 
// 
//    - Make a patch request to the server to change published boolean to true. 
// - Change the cancel button to a drop down of status changes? Or a button called status change?