import React, { Component } from "react";
import WizardFormFirstPage from "./CreateEventForm/createformpageone";
import WizardFormThirdPage from "./CreateEventForm/createformpagethree";
import WizardFromSecondPage from "./CreateEventForm/createformpagetwo";
import { reduxForm } from "redux-form";

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
            onSubmit={this.props.handleSubmit}
          />
        )}
      </div>
    );
  }
}

export default reduxForm({
  form: "CreateEventForm"
})(CreateEventWizardForm);
