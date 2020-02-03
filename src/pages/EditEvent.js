import React from "react";
import CreateEventForm from "../components/CreateEventForm";
import { connect } from "react-redux";
import {
  editEvent,
  resetNewImage
} from "../reducers/event_reducer";
import config from "../components/CreateEventForm/awsconfig";
import { withRouter } from "react-router-dom";
import S3 from "react-aws-s3";
const { uuid } = require("uuidv4");

require("dotenv").config();

// Brings in the state newImage
function mapStateToProps(state) {
  return {
    categories: state.eventReducer.event_categories,
    status: state.eventReducer.event_statuses,
    events: state.eventReducer.events,
    presenters: state.presenterReducer.presenters,
    newImage: state.eventReducer.newImage
  };
}

// Sends off data to the reducer
const mapDispatchToProps = dispatch => {
  return {
    editEvent: eventData => {
      dispatch(editEvent(eventData));
    },
    resetNewImage: () => {
      dispatch(resetNewImage());
    }
  };
};

class EditEvent extends React.Component {
  state = {
    display_message: "Edit Event",
    event: null,
    index: this.props.match.params.index
  };

  componentDidMount() {
    try {const { index } = this.props.match.params;
    let event = JSON.parse(JSON.stringify({ ...this.props.events[index] }));
    let event_dates = event.event_date;
    const event_date = event_dates.begin.split("T")[0];
    const event_start_time = event_dates.begin.split("T")[1];
    const event_end_time = event_dates.end.split("T")[1];
    event.event_date = event_date;
    event.event_start_time = event_start_time;
    event.event_end_time = event_end_time;
    event.registration_closed_date = event.registration_closed_date.split(
      "T"
    )[0];
    const presentereData = [];
    console.log(this.props.presenters);
    this.props.presenters.forEach(presenter => {
      event.presenters.forEach(presenterID => {
        if (presenterID._id.includes(presenter._id)) {
          presentereData.push({
            id: presenter["_id"],
            name: `${presenter.first_name} ${presenter.last_name}`
          });
        }
      });
    });
    event.selectedPresenters = presentereData;
    this.setState({ index: index, event: event });}
    catch(error) {window.location.href = '/admin'}
    
  }

  handleSubmit = data => {
    try {
      const event = JSON.parse(JSON.stringify(data));
      console.log(event);
      const presenters = event.selectedPresenters.map(presenter => presenter.id);
  
      if (presenters.length > 0) {
        event.presenters = presenters;
      }
  
      const event_date = {
        begin: `${event.event_date}T${event.event_start_time}`,
        end: `${event.event_date}T${event.event_end_time}`
      };
  
      event.event_date = event_date;
      if (event.registration_closed_date.split("T").length < 1)
        event.registration_closed_date = `${event.registration_closed_date}T23:55:55`;
  
      const ReactS3Client = new S3(config);
      const newFileName = `${uuid()}`;
      if (this.props.newImage) {
        ReactS3Client.uploadFile(this.props.newImage, newFileName)
          .then(data => {
            console.log("Uploaded file...response");
            event.images = [data.location];
            this.props.editEvent(event);
            this.props.resetNewImage();
          })
          .catch(err => console.error(err));
        this.props.editEvent(event);
        console.log("Submit end...");
      } else {
        this.props.editEvent(event);
      }
  
      this.setState({
        display_message: "Your event has been updated."
      });
    } catch(error) {console.log(error)}
    
    
    
  };

  render() {
    return (
      <div>
        <CreateEventForm
          handleSubmit={this.handleSubmit}
          populatedValue={this.state.event}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditEvent)
);
