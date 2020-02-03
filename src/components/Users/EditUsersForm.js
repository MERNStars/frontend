import React, { Component } from "react";
import simpleNumberLocalizer from "react-widgets-simple-number";
import { Field, reduxForm } from "redux-form";
import "react-widgets/dist/css/react-widgets.css";
import { connect } from "react-redux";
import validate from "../FormFields/validate";
import RenderTextField from "../FormFields/RenderTextField";
import {
  renderAgeNumberPicker,
  renderSexCombobox,
  RenderUneditableTextField,
  renderReligiousCombobox,
  renderInterestMultiSelects
} from "../FormFields/FormFields";

simpleNumberLocalizer();

function mapStateToProps(state) {
  return {
    religions: state.userReducer.religions,
    sexes: state.userReducer.sexes,
    categories: state.eventReducer.event_categories
  };
}

class EditUserForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="EditUserForm">
        <Field
          name="username"
          component={RenderUneditableTextField}
          type="email"
          label="Email"
          props={{
            disabled: true // like this
          }}
        />
        <Field
          name="first_name"
          component={RenderTextField}
          type="text"
          label="First Name"
        />
        <Field
          name="last_name"
          component={RenderTextField}
          type="text"
          label="Last Name"
        />
        <Field
          name="age"
          component={renderAgeNumberPicker}
          label="Age"
          value={13}
        />
        <Field
          name="sex"
          component={renderSexCombobox}
          label="Sex"
          sexes={this.props.sexes}
        />
        <Field
          name="religion"
          component={renderReligiousCombobox}
          religions={this.props.religions}
          label="Religious affiliation:"
        />
        <Field
          name="interests"
          component={renderInterestMultiSelects}
          categories={this.props.categories}
          label="Event categories that might interest you"
        />
        <br />
        <button className="btnSubmit" type="submit">
          Send
        </button>
      </form>
    );
  }
}

export default reduxForm({ form: "EditUserForm", validate })(
  connect(mapStateToProps)(EditUserForm)
);
