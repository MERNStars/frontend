import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import RenderTextField from "./RenderTextField";
import RenderPresentersField from "./RenderPresentersField";
import { connect } from "react-redux";
import { DropdownList } from "react-widgets";

function mapStateToProps(state) {
  return {
    categories: state.eventReducer.event_categories,
    status: state.eventReducer.event_statuses
  };
}

class CreateEventForm extends Component {
  RenderCategoriesField = ({
    input,
    name,
    label,
    meta: { touched, error, warning }
  }) => {
    const { categories } = this.props;
    return (
      <div className="My-Radio">
        {label}:
        <DropdownList
          {...input}
          name={name}
          data={categories}
          value={input.value}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    );
  };

  RenderStatusField = ({
    input,
    name,
    label,
    meta: { touched, error, warning }
  }) => {
    const { status } = this.props;
    return (
      <div className="My-Radio">
        {label}:
        <DropdownList
          {...input}
          name={name}
          data={status}
          value={input.value}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    );
  };

  render() {
    return (
      <div>
        <h1>Create an Event</h1>
    <div><RenderPresentersField /></div>
        <form onSubmit={this.props.handleSubmit}>
          <Field
            name="event_name"
            component={RenderTextField}
            type="text"
            label="Event Name"
          />
          <Field
            name="description"
            component={RenderTextField}
            type="textarea"
            label="Description"
          />
          <Field
            name="event_date"
            component={RenderTextField}
            type="date"
            label="Event Date"
          />
          <Field
            name="event_start_time"
            component={RenderTextField}
            type="time"
            label="Event Start Time"
          />
          <Field
            name="event_end_time"
            component={RenderTextField}
            type="time"
            label="Event End Time"
          />
          <Field
            name="registration_closed_date"
            component={RenderTextField}
            type="date"
            label="Registration close date"
          />
          <Field
            name="presenters"
            component={RenderTextField}
            type="text"
            label="Presenters"
          />
          <Field
            name="is_family_friendly"
            component={RenderTextField}
            type="checkbox"
            label="Family Friendly"
          />
          <Field
            name="minimum_age"
            component={RenderTextField}
            type="number"
            label="Minimum Age"
          />
          <Field
            name="event_category"
            component={this.RenderCategoriesField}
            type="text"
            label="Event Category"
          />
          <Field
            name="status"
            component={this.RenderStatusField}
            type="text"
            label="Status"
          />
          <Field
            name="images"
            component={RenderTextField}
            type="text"
            label="Upload Images"
          />
          <Field
            name="event_capacity"
            component={RenderTextField}
            type="number"
            label="Event Capacity"
          />
          <Field
            name="published"
            component={RenderTextField}
            type="checkbox"
            label="Published"
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "CreateEventForm"
})(connect(mapStateToProps)(CreateEventForm));
