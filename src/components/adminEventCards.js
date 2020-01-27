import React from 'react';
import { Card, Icon, Button, Modal } from 'semantic-ui-react'
import Moment from 'react-moment';
import AttendeeList from './eventAttendeesList';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';


import {deleteEvents} from '../reducers/event_reducer';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  deleteEvents
}

function mapStateToProps(state) {
  return { events: state.eventReducer.events };
}

class AdminEventCard extends React.Component {

  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  renderEvents(){
    return( this.props.published ? 
        this.displayCard( this.props ): null
      )  
  }

  onClickEdit = () => {
    console.log("Click Edit " + this.props.index);
    this.props.history.push(`/edit-event/${this.props.index}`);
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
          <Button size="small" onClick={ this.onClickEdit }>Edit</Button>
          <Modal open={this.state.modalOpen}
                onClose={this.handleClose}
                basic
                size='small'
                trigger={<Button size="small"onClick={this.handleOpen}>Delete</Button>}>
            <Modal.Header>Are you sure you want to delete?</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Button size="small" onClick={this.handleDelete}>Confirm Delete</Button>
                </Modal.Description>
              </Modal.Content>
          </Modal>
          <Button size="small">Cancel</Button>
        </Card.Content>
      </Card>
    )
  }

   handleDelete = async(event) => {
    console.log( this.props._id )
    const options = {
      method: "DELETE",
      headers: {
        authorization: `${localStorage.weexplore_token}`
      },
      url: `${process.env.REACT_APP_BACKEND_DB_URL}/events/delete/${this.props._id}`
    };
    const response = await Axios(options).catch( (err) => {
        console.log( `Error: ${err}`)
      })
      console.log( response.data )
      this.handleClose()
      this.dispatchDelete()
  }

  dispatchDelete() {
    let newEvents = this.props.events.filter( (event) => {
      return event._id !== this.props._id
    })
    // Send this to the events reducer to delete.
    this.props.deleteEvents(newEvents)
    console.log( newEvents )
  }



  render() {
    return(
       this.renderEvents() 
      )  
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AdminEventCard));


// To Do:
// - seperate them from published to unpublished
//    - Make a patch request to the server 
//    - Make a patch request to the server to change published boolean to true. 
// - Change the cancel button to a drop down of status changes? Or a button called status change?