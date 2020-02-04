import React from "react";

import Moment from "react-moment";
import { Card, Icon, Image, Segment, Label } from "semantic-ui-react";

class EventCard extends React.Component {
  displayEventCard = () => (
    <Card href={`/events/${this.props._id}`}>
      <Image
        src={
          this.props.images
            ? this.props.images[0]
            : require("../../assets/placeholder.jpg")
        }
        wrapped
        ui={false}
        size="small"
      />
      <Card.Content>
        <Card.Header>{this.props.event_name}</Card.Header>
        <Card.Description>
        {this.props.status === "scheduled" ? <><Icon name='time' size='large'/><Moment format="h:mm a">{this.props.event_date.begin}</Moment></>
           : <Label color='red' size='large' horizontal>
            {this.props.status}
          </Label> }
         <br /> Registration closes on <Moment format="D MMM YYYY">{this.props.registration_closed_date}</Moment>
        </Card.Description><br />
        
        <Card.Description><Label basic color='green'>{this.props.event_category}</Label><Label basic color='green'>{this.props.fee[0].type}</Label>
        <Label size='massive' attached='top left'><Moment format="D">{this.props.event_date.begin}</Moment><br /><Moment format="MMM">{this.props.event_date.begin}</Moment></Label>
          
        </Card.Description>
      </Card.Content>
    </Card>
  );

  eventDate() {
    return(
      <Moment format="D MMM">{this.props.event_date.begin}</Moment>
    )
  }

  render() {
    console.log( this.props)
    return this.displayEventCard();
  }
}

export default EventCard;
