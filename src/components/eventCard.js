import React from 'react';
import styles from '../styles/event.module.scss';
import Moment from 'react-moment';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class EventCard extends React.Component {

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
    const {index} = this.props
    console.log( this.props)
    return(
      <Link to={{ pathname:`/events/${index}`}}><div className={styles.eventCard}>
        {this.CardExampleCard()}
      </div></Link>
    )
  }

}

export default EventCard