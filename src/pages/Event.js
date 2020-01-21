import React from 'react';
import Axios from 'axios';
import Moment from 'react-moment';
import styles from '../styles/event.module.scss';


import { Button, Segment, Image, Label, Placeholder, Modal, Header } from 'semantic-ui-react'

require('dotenv').config()


class Event extends React.Component {

  state = {
    event: null,
    presenters: []
  }

  componentDidMount = async () => {
    const {id} = this.props.match.params
    const response = await Axios.get(`https://weexplorebackend.herokuapp.com/events/${id}/id`)
    const data = response.data 
    this.setState({ event: data, presenters: data.presenters});
  }

  renderEvent = () => {
    const { event_name, event_date, description, event_category } = this.state.event
    return (
      <div>
        <Segment.Group horizontal>
          <Segment>
            <p><Moment format= "D MMM HH:MM a">{event_date.begin}</Moment></p>
            <h1>{event_name}</h1>
            <p>{description}</p>
            <Modal trigger={<Button size='massive'>Attend</Button>}>
              <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
                  <Image wrapped size='medium' src='/images/avatar/large/rachel.png' />
                  <Modal.Description>
                    <Header>Default Profile Image</Header>
                  </Modal.Description>
                </Modal.Content>
            </Modal>
          </Segment>
          <Segment>
            <Image src={ require('../assets/placeholder.jpg')} size='medium'></Image>
          </Segment>
        </Segment.Group>
        <Segment textAlign='center'>
          <h1>About</h1>
          <p>{description}</p>
          <Label>{this.renderIcons()}</Label>
          <Label>{event_category}</Label>
        </Segment>
        <Segment.Group >
          <Segment textAlign='center'><h1>Date</h1></Segment>
          <Segment.Group horizontal>
            <Segment><h2>Start <Moment format= "D MMM HH:MM a">{event_date.begin}</Moment></h2></Segment>
            <Segment><h2>End <Moment format= "D MMM HH:MM a">{event_date.end}</Moment></h2></Segment>
          </Segment.Group>
          <Segment.Group horizontal>
            <Segment>
              <Placeholder style={{ height: 150, width: 150 }}>
                <Placeholder.Image />
              </Placeholder>
            </Segment>
            <Segment>
              <h3>Address</h3>
              <p>51 Morton St</p>
              <p>Clayton, VIC 3168</p>
              <p>Start Time: <Moment format= "HH:MM a">{event_date.begin}</Moment></p>
              <p>Event Duration: <Moment to={event_date.begin} ago>{event_date.end}</Moment> </p>
            </Segment>
          </Segment.Group>
          <Segment.Group >
            <Segment textAlign='center'>
              <h2>Presenters</h2>
            </Segment>
            <Segment>
              {this.renderPresenters()}
            </Segment>
          </Segment.Group>
        </Segment.Group>
      </div>
    )
  }

  renderIcons() {
    console.log( this.state.event)
    const { is_family_friendly } = this.state.event
    return(
    is_family_friendly ? "Family Friendly" : "18+" 
    )
  }

  renderPresenters = () => {

  }
  
  
  render(){
    console.log(this.state.event)
    return (
      <div className={styles.eventContainer}>
        <h1>Hello World</h1>
        { this.state.event ? this.renderEvent() : null }
      </div>     
    )
  }
}

export default Event

