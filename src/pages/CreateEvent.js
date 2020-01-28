import React, { Component } from "react";
import CreateEventForm from "../components/CreateEventForm";
import { createEvent } from "../reducers/event_reducer";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    selectedPresenters: state.presenterReducer.selectedPresenters
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createEvent: eventData => {
      dispatch(createEvent(eventData));
    }
  };
};

class CreateEvent extends Component {
  state = {
    display_message: "Create Event",
    event: null,
    previewEventDetail: ""
  };

  submit = data => {
    let presentersID = [];
    data.selectedPresenters.map(presenter => {
      presentersID.push(presenter.id)
    })
    data.presenters = presentersID
    console.log(data);
    // this.props.createEvent(data);
    // this.setState({
    //   display_message: "Your event has been created."
    // });
  };

  render() {
    return (
      <div>
        <CreateEventForm onSubmit={this.submit} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
