import React, { Component } from "react";
import CreateEventForm from "../components/CreateEventForm";
import { createEvent } from "../reducers/event_reducer";
import { connect } from "react-redux";

class CreateEvent extends Component {
  state = {
    display_message: "Create Event",
    event: null
  };

  submit = data => {
    console.log(data);
    this.props.createEvent(data);
    this.setState({
      display_message: "Your event has been created."
    });
  };

  render() {
    return (
      <div>
        <CreateEventForm onSubmit={this.submit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createEvent: eventData => {
      dispatch(createEvent(eventData));
    }
  };
};

export default connect(null, mapDispatchToProps)(CreateEvent);
