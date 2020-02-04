import React, { Component } from "react";
import simpleNumberLocalizer from "react-widgets-simple-number";
import { NumberPicker, DropdownList, Multiselect } from "react-widgets";
import { Field, reduxForm } from "redux-form";
import "react-widgets/dist/css/react-widgets.css";
import { connect } from "react-redux";
import Axios from "axios";
import validate from "../FormFields/validate";
import {
  RenderTextField,
  renderAgeNumberPicker,
  renderSexCombobox,
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

function usernameValidate(values) {
  return Axios.post(`${process.env.REACT_APP_BACKEND_DB_URL}/users/exists`, {
    username: values.username
  }).then(response => {
    if (response.data.exists) {
      throw { username: "That username is taken" };
    }
  });
}

class SignUpForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="SignUpForm">
        <Field
          name="username"
          component={RenderTextField}
          type="email"
          label="Email"
          value={localStorage.username}
          onChange={this.onChange}
        />
        <Field
          name="password"
          component={RenderTextField}
          type="password"
          label="Password"
        />
        <Field
          name="confirmPassword"
          component={RenderTextField}
          type="password"
          label="Confirm Password"
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
          sexes={this.props.sexes}
          label="Sex"
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

export default reduxForm({
  form: "SignUpForm",
  validate,
  usernameValidate,
  asyncBlurFields: ["username"]
})(connect(mapStateToProps)(SignUpForm));
