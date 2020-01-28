import React, { Component } from "react";
import WizardFormFirstPage from "../components/CreateEventForm/createformpageone";
import WizardFormThirdPage from "../components/CreateEventForm/createformpagethree";
import WizardFromSecondPage from "../components/CreateEventForm/createformpagetwo";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PreviewForm from "../components/CreateEventForm/previewevent";
import { createEvent } from "../reducers/event_reducer";

const mapDispatchToProps = dispatch => {
  return {
    createEvent: eventData => {
      dispatch(createEvent(eventData));
    }
  };
};

class CreateEventWizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.previewEvent = this.previewEvent.bind(this);
    this.state = {
      page: 1,
      event: "",
      display_message: ""
    };
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  previewEvent(data) {
    this.setState({ event: data });
    this.setState({ page: this.state.page + 1 });
  }

  handleSubmit = data => {
    let presentersID = [];
    data.selectedPresenters.map(presenter => {
      presentersID.push(presenter.id);
    });
    data.presenters = presentersID;
    console.log(data);
    this.props.createEvent(data);
    this.setState({
      display_message: "Your event has been created."
    });
  };

  render() {
    const { page } = this.state;
    return (
      <div>
        {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage} />}
        {page === 2 && (
          <WizardFromSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 3 && (
          <WizardFormThirdPage
            previousPage={this.previousPage}
            onSubmit={this.previewEvent}
          />
        )}
        {page === 4 && (
          <PreviewForm
            eventData={this.state.event}
            previousPage={this.previousPage}
            onSubmit={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}

export default reduxForm({
  form: "CreateEventForm"
})(connect(null, mapDispatchToProps)(CreateEventWizardForm));
