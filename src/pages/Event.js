import React from "react";
import axios from "axios";
import Moment from "react-moment";
import styles from "../styles/event.module.scss";
import AttendForm from "../components/attendform";

import { Link } from "react-router-dom";

import { Button, Segment, Image, Label, Modal } from "semantic-ui-react";

require("dotenv").config();

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
      <div>
        <Segment.Group horizontal>
          <Segment>
            <p>
              <Moment format="D MMM HH:MM a">{event_date.begin}</Moment>
            </p>
            <h1>{event_name}</h1>
            <p>{description}</p>
            {this.renderButton()}
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
            <Segment>{/* Insert code for google map here. */}</Segment>
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
            <Segment>{this.renderPresenters()}</Segment>
          </Segment.Group>
        </Segment.Group>
        <div className={styles.containerFooter}>
          <div className={styles.Footer}>{this.renderButton()}</div>
        </div>
      </div>
    );
  };

  renderButton() {
    return (
      <Modal trigger={<Button size="massive">{this.state.attend}</Button>}>
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
            <div>
              <Image
                src={require("../assets/profile-photo.jpg")}
                size="mini"
                avatar
              />
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

export default Event;
