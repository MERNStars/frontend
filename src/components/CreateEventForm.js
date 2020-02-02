import React, { Component } from "react";
import WizardFormFirstPage from "./CreateEventForm/createformpageone";
import WizardFormThirdPage from "./CreateEventForm/createformpagethree";
import WizardFromSecondPage from "./CreateEventForm/createformpagetwo";
import { reduxForm } from "redux-form";

class CreateEventForm extends Component {
  state = {
    page: 1,
    event: "",
    display_message: ""
  };

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  render() {
    const { page } = this.state;
    return (
      <div>
        {page === 1 && (
          <WizardFormFirstPage
            onSubmit={this.nextPage}
            initialValues={this.props.populatedValue}
          />
        )}
        {page === 2 && (
          <WizardFromSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
            initialValues={this.props.populatedValue}
          />
        )}
        {page === 3 && (
          <WizardFormThirdPage
            previousPage={this.previousPage}
            onSubmit={this.props.handleSubmit}
            initialValues={this.props.populatedValue}
          />
        )}
      </div>
    );
  }
}

export default reduxForm({
  form: "CreateEventForm"
})(CreateEventForm);
