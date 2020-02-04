import React from "react";
import CreateEventForm from "../components/Events/EventForm/CreateEventForm";
import { connect } from "react-redux";
import { createEvent, resetNewImage } from "../reducers/event_reducer";
import config from "../components/Events/EventForm/awsconfig";
import { withRouter } from "react-router-dom";
import S3 from "react-aws-s3";
import styles from '../styles/form.module.scss';
import {Segment} from 'semantic-ui-react';
const { uuid } = require("uuidv4");



require("dotenv").config();

// Brings in the state newImage
function mapStateToProps(state) {
  return {
    newImage: state.eventReducer.newImage
  };
}

// Sends off data to the reducer
const mapDispatchToProps = dispatch => {
  return {
    createEvent: eventData => {
      dispatch(createEvent(eventData));
    },
    resetNewImage: () => {
      dispatch(resetNewImage());
    }
  };
};

export class CreateEvent extends React.Component {
  handleSubmit = event => {
    let presentersID = [];
    if (event.selectedPresenters) {
      event.selectedPresenters.map(presenter => {
        presentersID.push(presenter.id);
      });
      event.presenters = presentersID;
    }
    const ReactS3Client = new S3(config);
    const newFileName = `${uuid()}`;
    if (this.props.newImage) {
      ReactS3Client.uploadFile(this.props.newImage, newFileName)
        .then(data => {
          console.log("Uploaded file...response");
          event.images = [data.location];
          console.log(event);
          this.props.createEvent(event);
          this.props.resetNewImage();
          this.setState({
            display_message: "Your event has been created."
          });

        })
        .catch(err => console.error(err));
    } else {
      event.image = [];
      this.setState({
        display_message: "Your event has been created."
      });
      this.props.createEvent(event);
    }
  };

  render() {
    return (
      <div className={styles.eventFormContainer}>
        <Segment id={styles.eventFormSegment} raised color='green'><CreateEventForm handleSubmit={this.handleSubmit} /></Segment>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateEvent)
);
