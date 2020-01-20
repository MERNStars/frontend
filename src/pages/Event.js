import React from 'react';
import styles from '../styles/event.module.scss';
import Moment from 'react-moment';
import { Card, Icon, Image } from 'semantic-ui-react'

class Event extends React.Component {

  CardExampleCard = () => (
    <Card>
      <Image src={ require('../assets/placeholder.jpg')} wrapped ui={false} />
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
        <a>
          <Icon name='user' />
          {this.props.event_capacity}
        </a>
      </Card.Content>
    </Card>
  )

  render() {
    console.log( this.props)
    return(
      <div className={styles.eventCard}>
        <a href="#">{this.CardExampleCard()}</a>
      </div>
    )
  }

}

export default Event

