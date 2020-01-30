import React from "react";
import axios from "axios";
import Moment from "react-moment";
import {connect} from 'react-redux';
import styles from "../styles/event.module.scss";
import AttendForm from "../components/attendform";

import { Link } from "react-router-dom";

import { Button, Image, Label, Modal } from "semantic-ui-react";

require("dotenv").config();

function mapStateToProps(state){
  return {userLoggedIn: state.userReducer.userLoggedIn}
}

class Event extends React.Component {
  state = {
    event: null,
    attending: false,
    attend: "Attend"
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    const response = await axios.get(
      `https://weexplorebackend.herokuapp.com/events/${id}/id`
    );
    const data = response.data;
    this.setState({ event: data });
    this.checkAttendStatus();
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
          console.log(response.data);
          this.props.history.push("/events");
        });
    } catch (error) {
      console.log(error);
    }
  };

  unattendEvent = async event => {
    console.log(this.state.event);
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
          console.log(response.data);
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
      event_category
    } = this.state.event;

    return (
    <>
      <div className={styles.eventBox}>
        <div className={styles.innerContainer}>
          <div className={styles.description}>
            <div className={styles.endContainer}>
              <Moment format="D MMM YYYY">{event_date.begin}</Moment>
            </div>
            <div className={styles.mainContainer}>
              <h1>{event_name}</h1>
              <p>{description}</p>
            </div>
            <div className={styles.endContainer}>
              {this.renderButton()}
            </div>
          </div>
        <div className={styles.eventImage}>
            <Image
              src={require("../assets/placeholder.jpg")}
              size="big"
              rounded
              id={styles.image}
            ></Image>
          </div>
        </div>
      </div>
      <div className={styles.eventBox} id={styles.shadedBox}>
        <div className={styles.innerContainer}>
          <div className={styles.description} id={styles.about}>
            <div className={styles.endContainer}><h1>About</h1></div>
            <p>{description}</p>
            <div className={styles.endContainer}>
              <Label>{this.renderIcons()}</Label>
              <Label>{event_category}</Label>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.eventBox}>
        <div className={styles.outerContainer}>
          <div className={styles.extraContainer}>
            <h1 id={styles.datetitle}>Date</h1>
            <h2 id={styles.startTime}>Start <Moment format="D MMM HH:MM a">{event_date.begin}</Moment></h2>
            <h2 id={styles.endTime}>End <Moment format="D MMM HH:MM a">{event_date.end}</Moment></h2>
            <div className={styles.googleMap}></div>
            <div className={styles.address}>
              <h2>Address</h2>
              <p>51 Morton St</p>
              <p>Clayton, VIC 3168</p>
              <sub>Start Time: <Moment format="HH:MM a">{event_date.begin}</Moment></sub>
              <sub>Event Duration:{" "}<Moment to={event_date.begin} ago> {event_date.end}</Moment>{" "}</sub>
            </div>  
          </div>
        </div>
      </div>
      <div className={styles.eventBox} id={styles.shadedBox}>
        <div className={styles.innerContainer}>
          <div className={styles.insideContainer}>
            <div className={styles.Heading}><h2>Presenters</h2></div>
            {this.renderPresenters()}
        </div>
        </div>
      </div>
        <div className={styles.containerFooter}>
          <div className={styles.Footer}>{this.renderButton()}</div>
        </div>
     </>
    );
   
  };

  attendButton() {
    if( this.state.event.status === "scheduled"){
      return <Button size="massive" basic id={styles.button}>{this.state.attend}</Button>
    } else {
      return <Button size="massive" id={styles.button} disabled>{this.state.event.status}</Button>
    }  
  }

  renderButton() {
    const {userLoggedIn} = this.props;
    if(userLoggedIn)
      return (
        <Modal trigger={ this.state.event ? this.attendButton() : null}>
          <Modal.Header>{this.state.attend}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {this.state.attending ? (
                <>
                  Are you sure you want to unattend?
                  <Button onClick={this.unattendEvent}>Yes</Button>
                </>
              ) : (
                <AttendForm
                  onSubmit={this.attendEvent}
                  event={this.state.event}
                  initialValues={{ username: localStorage.username }}
                />
              )}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      );
     else 
      return(
      <Link to={{
        pathname: "/login",
      }}><Button size="massive" basic id={styles.button}>Attend</Button></Link>)
  }



  renderIcons() {
    const { is_family_friendly } = this.state.event;
    return is_family_friendly ? "Child Friendly" : "18+";
  }

  renderPresenters() {
    const { presenter_detail } = this.state.event;
    return presenter_detail
      ? presenter_detail.map(presenter => {
          return (
            <div className={styles.presenterBox}>
              <div>
              <span>
                {presenter.title} {presenter.first_name} {presenter.last_name}
              </span>
              <br></br>
              <span>
                <sub>{presenter.qualification}</sub>
              </span>
              <span>
                <p>{presenter.short_description}</p>
              </span>
              </div>
              <img id={styles.profileImg} src={require("../assets/profile-photo.jpg")} alt="profile of presenter"/>
            </div>
          );
        })
      : null;
  }

  render() {
    return (
      <div>
        <Link to={{ pathname: `/events` }}>Back to events</Link>
        <div className={styles.eventContainer}>
          {this.state.event ? this.renderEvent() : null}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Event);
