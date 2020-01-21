import React from "react";
import Axios from "axios";
import Moment from "react-moment";
import styles from "../styles/event.module.scss";
import AttendForm from "../components/attendform";

import {
  Button,
  Segment,
  Image,
  Label,
  Placeholder,
  Modal,
  Header
} from "semantic-ui-react";

require("dotenv").config();

class Event extends React.Component {
  submit = data => {
    console.log(data);
  };

  state = {
    event: null,
    presenters: [],
    presenterDetails: []
  }

  componentDidMount = async () => {
    const {id} = this.props.match.params
    const response = await Axios.get(`https://weexplorebackend.herokuapp.com/events/${id}/id`)
    const data = response.data 
    this.setState({ event: data, presenters: data.presenters});
    this.getPresenter()
  }

   
  // Remove this and do this in the backend

  getPresenter = () => {
    let presentArray = []
    this.state.presenters.map( async (presenter) => {
      const response = await Axios.get(`https://weexplorebackend.herokuapp.com/presenters/${presenter}`)
      presentArray.push( response.data)
    })
      this.setState( {presenterDetails: presentArray})
  }
>>>>>>> master



  renderEvent = () => {
    const {
      _id,
      event_name,
      event_date,
      description,
      event_category
    } = this.state.event;
    return (
      <div>
        <Segment.Group horizontal>
          <Segment>
            <p>
              <Moment format="D MMM HH:MM a">{event_date.begin}</Moment>
            </p>
            <h1>{event_name}</h1>
            <p>{description}</p>
            <Modal trigger={<Button size="massive">Attend</Button>}>
              <Modal.Header>Attendees</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <AttendForm onSubmit={this.submit} event={this.state.event} initialValues={{username: localStorage.username}}/>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </Segment>
          <Segment>
            <Image
              src={require("../assets/placeholder.jpg")}
              size="medium"
            ></Image>
          </Segment>
        </Segment.Group>
        <Segment textAlign="center">
          <h1>About</h1>
          <p>{description}</p>
          <Label>{this.renderIcons()}</Label>
          <Label>{event_category}</Label>
        </Segment>
        <Segment.Group>
          <Segment textAlign="center">
            <h1>Date</h1>
          </Segment>
          <Segment.Group horizontal>
            <Segment>
              <h2>
                Start <Moment format="D MMM HH:MM a">{event_date.begin}</Moment>
              </h2>
            </Segment>
            <Segment>
              <h2>
                End <Moment format="D MMM HH:MM a">{event_date.end}</Moment>
              </h2>
            </Segment>
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
              <p>
                Start Time: <Moment format="HH:MM a">{event_date.begin}</Moment>
              </p>
              <p>
                Event Duration:{" "}
                <Moment to={event_date.begin} ago>
                  {event_date.end}
                </Moment>{" "}
              </p>
            </Segment>
          </Segment.Group>
          <Segment.Group>
            <Segment textAlign="center">
              <h2>Presenters</h2>
            </Segment>
<<<<<<< HEAD
            <Segment>{this.renderPresenters()}</Segment>
=======
            <Segment>
              { this.state.presenterDetails.length > 0 && 
               this.renderPresenters()
               }
            </Segment>
>>>>>>> master
          </Segment.Group>
        </Segment.Group>
      </div>
    );
  };

  renderIcons() {
<<<<<<< HEAD
    console.log(this.state.event);
    const { is_family_friendly } = this.state.event;
    return is_family_friendly ? "Family Friendly" : "18+";
  }

  renderPresenters = () => {};

  render() {
    console.log(this.state.event);
=======
    const { is_family_friendly } = this.state.event
    return(
    is_family_friendly ? "Child Friendly" : "18+" 
    )
  }

  renderPresenters = () => {
      console.log( this.state.presenterDetails)
  }
  
  
  render(){
>>>>>>> master
    return (
      <div className={styles.eventContainer}>
        <h1>Hello World</h1>
        {this.state.event ? this.renderEvent() : null}
      </div>
    );
  }
}

export default Event;
