import React from 'react';
import { Card, Icon, Button, Modal, Dropdown } from 'semantic-ui-react'
import Moment from 'react-moment';
import AttendeeList from './eventAttendeesList';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';


import {deleteEvents, updateEvents} from '../reducers/event_reducer';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  deleteEvents,
  updateEvents
}

function mapStateToProps(state) {
  return { events: state.eventReducer.events, event_statuses: state.eventReducer.event_statuses };
}

class AdminEventCard extends React.Component { 

  state = { 
    modalOpen: false,
    status_options: [] 
  }

  componentDidMount() {
    let array =[]
    this.props.event_statuses.map( (status, index) => {
      return(array.push( {
        key: index,
        text: status,
        value: status
      }))
    })
    this.setState( { status_options: array})
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  renderEvents(){
    return( 
        this.displayCard( this.props )
      )  
  }

  onClickEdit = () => {
    console.log("Click Edit " + this.props.index);
    this.props.history.push(`/edit-event/${this.props.index}`);
  }

  displayCard = event => {
    return(
      <Card fluid>
        <Card.Content>
          <Card.Header>{event.event_name}</Card.Header>
          <Card.Meta>Presenter</Card.Meta>
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
          {event.published ? <span>
              Status{' '}
              <Dropdown
                inline
                options={this.state.status_options}
                onChange={this.updateEventStatus}
                defaultValue={event.status}
              />
            </span> : <Button size="small" onClick={this.publishEvent}>Publish</Button>}
        </Card.Content>
      </Card>
    )
  }

  // Delete Event Functions

   handleDelete = async(event) => {
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
    this.handleClose()
    this.dispatchDelete()
  }

  dispatchDelete() {
    let newEvents = this.props.events.filter( (event) => {
      return event._id !== this.props._id
    })
    this.props.deleteEvents(newEvents)
  }

  // Publish Event Functions

  publishEvent = async(event) => {
    const options = {
      method: "PATCH",
      headers: {
        authorization: `${localStorage.weexplore_token}`
      },
      url: `${process.env.REACT_APP_BACKEND_DB_URL}/events/publish`, 
      data: {
        _id: this.props._id,
        published: !this.props.published
      }
    };
    const response = await Axios(options).catch( (err) => {
      console.log( `Error: ${err}`)
    })
    console.log( response.data )
    this.dispatchEvent(response.data)
  }

  // Update Status Functions

 updateEventStatus =  async (e, {key}) => {
    let newStatus = this.props.event_statuses[key]
    console.log( newStatus)
    const options = {
      method: "PATCH",
      headers: {
        authorization: `${localStorage.weexplore_token}`
      },
      url: `${process.env.REACT_APP_BACKEND_DB_URL}/events/status`, 
      data: {
        _id: this.props._id,
        status: newStatus
      }
    };
    const response = await Axios(options).catch( (err) => {
      console.log( `Error: ${err}`)
    })
    console.log( response.data )
    this.dispatchEvent(response.data)
  }

  // Update store events

  dispatchEvent = response => {
    let eventIndex = this.props.events.findIndex( (event) => {
      return event._id === response._id
    });
    let newEvents = [...this.props.events]
    newEvents[eventIndex] = response
    this.props.updateEvents(newEvents)
  }
 
  render() {
    return(
       this.renderEvents() 
      )  
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminEventCard)
