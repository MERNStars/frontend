import React from "react";
import axios from "axios";
import Moment from "react-moment";
import { connect } from "react-redux";
import styles from "../styles/event.module.scss";
import formStyles from "../styles/form.module.scss";
import AttendForm from "../components/Attendees/attendform";
import EventCard from "../components/Events/eventCard";

import { Link } from "react-router-dom";

import { Button, Image, Modal, Icon, Card, Segment, Header } from "semantic-ui-react";
import Presenters from "../components/Presenters/PresenterDetails";

require("dotenv").config();

function mapStateToProps(state) {
  return { userLoggedIn: state.userReducer.userLoggedIn };
}

class Event extends React.Component {
  state = {
    event: null,
    attending: false,
    attend: "Attend",
    previewEvents: null
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_DB_URL}/events/${id}/id`
    );
    const data = response.data;
    this.setState({ event: data });
    this.checkAttendStatus();
    const eventsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_DB_URL}/events/category/${response.data.event_category}`)
    console.log( eventsResponse )
    let newData = eventsResponse.data.filter(d => {
      return d.published === true && d.status !== "completed" && d._id !== response.data._id;
    });
    this.setState( {previewEvents: newData.slice(0,4)})
  };

  // Setting the attend status for button display
  checkAttendStatus() {
    const { event } = this.state;
    return event
      ? event.attendees.find(
          attendee => attendee.username === localStorage.username
        )
        ? this.setState({ attending: true, attend: "Unattend" })
        : this.setState({ attending: false })
      : null;
  }

  attendEvent = async data => {
    try {
      await axios
        .patch(
          `${process.env.REACT_APP_BACKEND_DB_URL}/events/attend`,
          {
            _id: this.state.event._id,
            username: data.username,
            friends: data.friends === undefined ? [] : data.friends,
            dependents: data.dependents === undefined ? [] : data.dependents
          },
          {
            headers: {
              authorization: `${localStorage.weexplore_token}`
            }
          }
        )
        .then(response => {
          console.log(response.data.success);
          if (response.data.success === true) {
            localStorage.message =
              "Thank you for Clicking Attend. Look forward to seeing you there!";
            window.location.href = "/events";
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  unattendEvent = async event => {
    try {
      await axios
        .patch(
          `${process.env.REACT_APP_BACKEND_DB_URL}/events/unattend`,
          {
            _id: this.state.event._id,
            username: localStorage.username
          },
          {
            headers: {
              authorization: `${localStorage.weexplore_token}`
            }
          }
        )
        .then(response => {
          this.props.history.push(`/events/${this.state.event._id}`);
        });
    } catch (error) {
      console.log(error);
    }
    this.setState({ attending: false, attend: "Attend" });
  };

  renderEvent = () => {
    const {
      event_name,
      event_date,
      description,
      images, 
      event_capacity,
      fee,
      attendee_count,
      presenter_detail
    } = this.state.event;

    return (
      <>
        <header>
          <h2><Moment format="D MMM YYYY">{event_date.begin}</Moment></h2>
          <h1>{event_name}</h1>
          <p>Hosted by {presenter_detail.map( (presenter) => {
            return( `${presenter.title} ${presenter.first_name} ${presenter.last_name}`)})}</p>
        </header>
        <div className={styles.eventBox}>
          <div className={styles.innerContainer}>
          <div className={styles.eventImage}>
              <Image
                src={images ? images[0] : require("../assets/placeholder.jpg")}
                size="big"
                rounded
                id={styles.image}
              ></Image>
            <div className={styles.description}>
              <div className={styles.endContainer}>
                <h3>About the event</h3>
              </div>
              <div className={styles.mainContainer}>
                <p>{description}</p>
              </div>
              <div className={styles.endContainer}>{this.renderButton()}</div>
            </div>
            </div>
          </div>
        </div>
        <div className={styles.eventBox} id={styles.descriptionBox}>
        <h2>Here's a little more information</h2>
            <Segment.Group horizontal >
              <Segment.Group >
                <Segment color='green'><Image src={require('../assets/staticmap.png')} size='medium' /></Segment>
                <Segment.Group>
                  <Segment><Icon name='point'/>weExplore Centre, Clayton, VIC <br /></Segment>
                  <Segment><Icon name='clock outline' size='large'/>
                    Duration <Moment to={event_date.begin} ago>
                    {event_date.end}
                    </Moment><br />
                    <h3>Start <Moment format=" h:mm a">{event_date.begin}</Moment></h3>
                    <h3>End <Moment format= "h:mm a">{event_date.end}</Moment></h3></Segment>
                  <Segment>{this.renderIcons()}</Segment>
                </Segment.Group>
              </Segment.Group> 
              <Segment.Group>
                <Segment color='green'><Header textAlign='center'>
                    Event Hosts
                  </Header></Segment>
                  <Segment><Presenters {...this.state.event} {...this.props} /></Segment>
              </Segment.Group>
            </Segment.Group>   
        </div>

        <div className={styles.extraEventsBox}>
          <div className={styles.insideContainer}>
          <h1>Other events we think you might like...</h1>
          <Card.Group itemsPerRow={4}>
            { this.state.previewEvents ? this.state.previewEvents.map ( (event)=>{
             return <EventCard {...event}/>
            } ) : null}
            </Card.Group>
           </div>
        </div>
       

        <div className={styles.containerFooter}>
          <div className={styles.Footer}>
            <div className={styles.FooterDescription}>
              <Moment format="ddd, D MMM, h:mm a" className={styles.FooterDate}>{event_date.begin}</Moment>
              <h3>{event_name}</h3>
            </div>
            <div className={styles.FooterButton}>
            <p>Only {event_capacity - attendee_count} spots left! </p>
            {this.renderButton()}
            </div>
            </div>
        </div>
      </>
    );
  };

  attendButton() {
    if (this.state.event.status === "scheduled") {
      return (
        <Button size="massive" color='green' id={styles.button}>
          {this.state.attend}
        </Button>
      );
    } else {
      return (
        <Button size="massive" id={styles.button} disabled>
          {this.state.event.status}
        </Button>
      );
    }
  }

  renderButton() {
    if (localStorage.weexplore_token)
      return (
        <Modal trigger={this.state.event ? this.attendButton() : null}>
          <Modal.Header className={styles.ModalHeader}>{this.state.attend} <strong>{this.state.event.event_name}</strong></Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {this.state.attending ? (
                <div className={formStyles.AttendForm}>
                  <Segment id={formStyles.AttendFormSegment} raised color='green'>
                    <h2>Are you sure you want to unattend?</h2>
                  <Button onClick={this.unattendEvent} className={formStyles.NextButton}>Yes</Button></Segment>
                </div>
              ) : (
                <div className={formStyles.AttendForm}>
                <Segment id={formStyles.AttendFormSegment} raised color='green'><AttendForm
                  onSubmit={this.attendEvent}
                  event={this.state.event}
                  initialValues={{ username: localStorage.username }}
                /></Segment></div>
              )}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      );
    else {
      localStorage.message = "Please sign in to attend event";
    }
    return (
      <Link
        to={{
          pathname: "/login"
        }}
      >
        <Button size="massive" color='green' id={styles.button}>
          Attend
        </Button>
      </Link>
    );
  }

  renderIcons() {
    const { is_family_friendly } = this.state.event;
    return is_family_friendly ? <><Icon name='check' />Family Friendly</>: null;
  }

  render() {
    console.log( this.state.event)
    return (
        <div className={styles.eventContainer}>
          {this.state.event ? this.renderEvent() : null}
        </div>
      
    );
  }
}

export default connect(mapStateToProps)(Event);
