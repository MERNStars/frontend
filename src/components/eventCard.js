import React from 'react';

import Moment from 'react-moment';
import { Card, Icon, Image, Label } from 'semantic-ui-react'
import styles from '../styles/card.module.scss';

class EventCard extends React.Component {

  displayEventCard = () => (
    <Card
      href={`/events/${this.props._id}`}>
        <Image src={ 
          this.props.images ? this.props.images[0] : require('../assets/placeholder.jpg')} wrapped ui={false} size="small"/>
      <Card.Content>
        <Card.Header>{this.props.event_name}</Card.Header>
        <Card.Meta>
          <span className='date'><Moment format="D MMM">{this.props.event_date.begin}</Moment></span>
        </Card.Meta>
        <Card.Meta><span className='time'>Start Time <Moment format="HH:MM">{this.props.event_date.begin}</Moment></span></Card.Meta>
        <Card.Description>
          {this.props.event_category}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Icon name='user' />
          {this.props.event_capacity}
          <Label basic color='red' pointing>{this.props.status}</Label>
      </Card.Content>
    </Card>
  )


  render() {
    return(
       this.displayEventCard()
    )
  }

}

export default EventCard