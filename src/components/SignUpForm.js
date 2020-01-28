import React, { Component } from "react";
import simpleNumberLocalizer from "react-widgets-simple-number";
import { NumberPicker, DropdownList, Multiselect } from "react-widgets";
import { Field, reduxForm } from "redux-form";
import "react-widgets/dist/css/react-widgets.css";
import { connect } from "react-redux";

simpleNumberLocalizer();

function mapStateToProps(state) {
  return {
    religions: state.userReducer.religions,
    sexes: state.userReducer.sexes,
    categories: state.eventReducer.event_categories
  };
}

function validate(values) {
  let errors = {};

  if (!values.first_name) {
    errors.first_name = "Required";
  }

  if (!values.last_name) {
    errors.last_name = "Required";
  }

  if (!values["username"]) {
    errors.username = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
  ) {
    errors.username = "Invalid email address";
  }

  if (
    !/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/i.test(
      values.password
    )
  ) {
    errors.password =
      "Password must be 8 characters or longer, including at a number, a symbol and a capital letter";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password doesn't match";
  }

  if (!values.age) {
    errors.age = "Required";
  }

  if (!values.sex) {
    errors.sex = "Required";
  }

  return errors;
}

class SignUpForm extends Component {
  renderTextField({ input, label, type, meta: { touched, error, warning } }) {
    // console.log(input)
    return (
      <div className="Small-Text">
        <label>{label}</label> <br />
        <input
          {...input}
          className="text-field"
          onChange={input.onChange}
          placeholder={label}
          type={type}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    );
  }

  renderAgeNumberPicker({
    input,
    name,
    label,
    meta: { touched, error, warning }
  }) {
    return (
      <div className="Small-Text">
        <label>{label}</label> <br />
        <NumberPicker
          {...input}
          name={name}
          format="###"
          min={13}
          max={150}
          value={input.value !== "" ? Number.parseInt(input.value) : 18}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    );
  }

  renderSexCombobox = ({
    input,
    name,
    label,
    meta: { touched, error, warning }
  }) => {
    const { sexes } = this.props;
    return (
      <div className="My-Radio">
        {label}:
        <DropdownList {...input} name={name} data={sexes} value={input.value} />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    );
  };

  renderReligiousCombobox = ({ input, name, label }) => {
    const { religions } = this.props;
    return (
      <div className="My-Radio">
        {label}:
        <DropdownList
          {...input}
          name={name}
          data={religions}
          value={input.value}
        />
      </div>
    );
  };

  renderInterestMultiSelects = ({ input, name, label }) => {
    const { categories } = this.props;
    console.log(input.value);

    return (
      <div className="My-Radio">
        {label}:
        <Multiselect
          {...input}
          name={name}
          data={categories}
          onBlur={this.props.onBlur}
          value={input.value !== "[]" ? [...input.value] : "[]"}
        />
      </div>
    );
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="SignUpForm">
        <Field
          name="username"
          component={this.renderTextField}
          type="email"
          label="Email"
          value={localStorage.username}
        />
        <Field
          name="password"
          component={this.renderTextField}
          type="password"
          label="Password"
        />
        <Field
          name="confirmPassword"
          component={this.renderTextField}
          type="password"
          label="Confirm Password"
        />
        <Field
          name="first_name"
          component={this.renderTextField}
          type="text"
          label="First Name"
        />
        <Field
          name="last_name"
          component={this.renderTextField}
          type="text"
          label="Last Name"
        />
        <Field
          name="age"
          component={this.renderAgeNumberPicker}
          label="Age"
          value={13}
        />
        <Field name="sex" component={this.renderSexCombobox} label="Sex" />
        <Field
          name="religion"
          component={this.renderReligiousCombobox}
          label="Religious affiliation:"
        />
        <Field
          name="interests"
          component={this.renderInterestMultiSelects}
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

export default reduxForm({ form: "SignUpForm", validate })(
  connect(mapStateToProps)(SignUpForm)
);
