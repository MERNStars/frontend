import React from 'react';
import { Card, Icon, Button, Modal, Dropdown, Divider} from 'semantic-ui-react'
import Moment from 'react-moment';
import AttendeeList from '../Events/eventAttendeesList';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import {deleteEvents, updateEvents} from '../../reducers/event_reducer';
import { connect } from 'react-redux';
import Presenter from '../Presenters/PresenterDetails';
import { NotificationManager } from "react-notifications";


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
        key: status,
        text: status,
        value: index
      }))
    })
    this.setState( { status_options: array})
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })


  onClickEdit = () => {
    console.log("Click Edit " + this.props.index);
    this.props.history.push(`/edit-event/${this.props.index}`);
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
    NotificationManager.error(null, "Event Deleted");

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
    this.dispatchEvent(response.data)
    NotificationManager.info(null, "Event Published");
    

  }

  // Update Status Functions

 updateEventStatus =  async (e, {value}) => {
    let newStatus = this.props.event_statuses[value]
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
    const event = this.props 
    return(
      <Card color={event.published && event.status !== "completed" ? 'green' : null }>
        <Card.Content>
          <Card.Header>{event.event_name}</Card.Header>
          <Card.Description><Presenter {...event}/></Card.Description>
          <Card.Meta>
            <Icon name="time"/><Moment format="D MMM">{event.event_date.begin}</Moment>
          </Card.Meta>
        </Card.Content>
        <Card.Content>
          <Modal trigger={<Button 
            fluid 
            content= {event.status !== "completed" ? "Attending" : "Attended"}
            icon="user"
            label={{ as: 'a', basic: true, content: event.attendee_count }}
            labelPosition='right'
            ></Button>}>
              <Modal.Header>Attendees</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <AttendeeList  {...event}/>
                </Modal.Description>
              </Modal.Content>
            </Modal>
        </Card.Content>
        <Card.Content extra>
          <Button size="small" basic onClick={ this.onClickEdit }icon labelPosition='left'><Icon name='setting'/>Edit</Button>
          <Modal open={this.state.modalOpen}
                onClose={this.handleClose}
                basic
                size='small'
                trigger={<Button basic size="small"onClick={this.handleOpen} icon labelPosition='left'><Icon name='trash alternate outline'/>Delete</Button>}>
            <Modal.Header>Are you sure you want to delete?</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Button size="small" onClick={this.handleDelete}>Confirm Delete</Button>
                </Modal.Description>
              </Modal.Content>
          </Modal>
        </Card.Content>
        <Card.Content extra>
          {event.published && event.status !== "completed" ? <span>
              Status{' '}
              <Dropdown
                inline
                options={this.state.status_options}
                onChange={this.updateEventStatus}
                placeholder={event.status}
              />
            </span>  : event.status !== "completed" ? <Button color="green" basic fluid onClick={this.publishEvent}>Publish</Button> : <Button color="green" basic fluid onClick={this.onClickEdit}>Republish</Button> }
          </Card.Content>
      </Card>
      
    ) 
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AdminEventCard));
