import React from "react";
import { reduxForm } from "redux-form";
import styles from "../../styles/event.module.scss";
import placeholder from "../../assets/placeholder.jpg";

import Moment from "react-moment";
import { Button, Segment, Image, Label } from "semantic-ui-react";

function renderPresenters(props) {
  return props
    ? props.map(presenter => {
        return (
          <div>
            <Image
              src={require("../../assets/profile-photo.jpg")}
              size="mini"
              avatar
            />
            <span>{presenter.name}</span>
            <br></br>
            <span>
              <sub>Text Here</sub>
            </span>
            <span>
              <p>Description Text Here</p>
            </span>
          </div>
        );
      })
    : null;
}
function RenderEvent(event) {
  const {
    event_name,
    event_date,
    event_start_time,
    description,
    event_category,
    is_family_friendly,
    event_end_time,
    selectedPresenters
  } = event.props;
  console.log(event);
  return (
    <div className={styles.eventContainer}>
      <Segment.Group horizontal>
        <Segment>
          <p>
            <Moment format="D MMM HH:MM a">{`${event_date}:${event_start_time}`}</Moment>
          </p>
          <h1>{event_name}</h1>
          <p>{description}</p>
          <Button size="massive">attend</Button>
        </Segment>
        <Segment>
          <Image src={placeholder} size="medium"></Image>
        </Segment>
      </Segment.Group>
      <Segment textAlign="center">
        <h1>About</h1>
        <p>{description}</p>
        <Label>{is_family_friendly ? "Child Friendly" : "18+"}</Label>
        <Label>{event_category}</Label>
      </Segment>
      <Segment.Group>
        <Segment textAlign="center">
          <h1>Date</h1>
        </Segment>
        <Segment.Group horizontal>
          <Segment>
            <h2>
              <Moment format="D MMM HH:MM a">{`${event_date}:${event_start_time}`}</Moment>
            </h2>
          </Segment>
          <Segment>
            <h2>
              <Moment format="D MMM HH:MM a">{`${event_date}:${event_start_time}`}</Moment>
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
              <Moment format="D MMM">{event_date}</Moment> {event_start_time}
            </p>
            <p>
              Event Duration:{" "}
              <Moment to={`${event_date}:${event_start_time}`} ago>
                {`${event_date}:${event_end_time}`}
              </Moment>{" "}
            </p>
          </Segment>
        </Segment.Group>
        <Segment.Group>
          <Segment textAlign="center">
            <h2>Presenters</h2>
          </Segment>
          <Segment> {renderPresenters(selectedPresenters)}</Segment>
        </Segment.Group>
      </Segment.Group>
    </div>
  );
}

const PreviewForm = props => {
  const { handleSubmit, pristine, previousPage, submitting, eventData } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" disabled={pristine || submitting}>
          Create Event
        </button>
      </div>
      <RenderEvent props={eventData} />
    </form>
  );
};

export default reduxForm({
  form: "wizard",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(PreviewForm);
