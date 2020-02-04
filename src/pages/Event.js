import React from "react";
import axios from "axios";
import Moment from "react-moment";
import { connect } from "react-redux";
import styles from "../styles/event.module.scss";
import AttendForm from "../components/Attendees/attendform";

import { Link } from "react-router-dom";

import { Button, Image, Modal, Icon, Card } from "semantic-ui-react";
import Presenters from "../components/Presenters/PresenterDetails";



require("dotenv").config();

function mapStateToProps(state) {
  return { userLoggedIn: state.userReducer.userLoggedIn };
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
      `${process.env.REACT_APP_BACKEND_DB_URL}/events/${id}/id`
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
      event_category,
      images, 
      event_capacity,
      fee,
      attendee_count
    } = this.state.event;

    return (
      <>
        <header>
          <h2><Moment format="D MMM YYYY">{event_date.begin}</Moment></h2>
          <h1>{event_name}</h1>
          
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

        <div className={styles.eventBox} id={styles.shadedBox}>
          <div className={styles.extraContainer}>
            <Card>
              <Image src={require('../assets/staticmap.png')}/>
              <Card.Content>
                <Card.Meta>
                  <Icon name='point'/>
                  weExplore Centre, Clayton, VIC 
                </Card.Meta>
                <br />
                <Card.Description>
                  <Icon name='clock outline' size='large'/>
                  
                  Duration <Moment to={event_date.begin} ago>
                  {event_date.end}
                </Moment><br />
                  Start <Moment format=" h:mm a">{event_date.begin}</Moment><br />
                  End <Moment format= "h:mm a">{event_date.end}</Moment><br />
                  </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    {this.renderIcons()}
                 </Card.Content>
            </Card>
          </div>
        </div>

        <div className={styles.insideContainer}>
              <div className={styles.Heading}>
                <h2>Presenters</h2>
              </div>
              <Presenters {...this.state.event} {...this.props} />
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
