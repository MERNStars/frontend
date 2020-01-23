import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class CreateEventForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h1>Create an Event</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="event_name">Event Name</label>
            <Field name="event_name" component="input" type="text" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field name="description" component="input" type="textarea" />
          </div>
          <div>
            <label htmlFor="event_date">Event Date</label>
            <Field name="event_date" component="input" type="date" />
          </div>
          <div>
            <label htmlFor="event_date">Event Date</label>
            <Field name="event_date" component="input" type="date" />
          </div>
          <div>
            <label htmlFor="registration_closed_date">Registration close date</label>
            <Field name="registration_closed_date" component="input" type="date" />
          </div>
          <div>
            <label htmlFor="event_name">Event Name</label>
            <Field name="event_name" component="input" type="text" />
          </div>
          <div>
            <label htmlFor="event_name">Event Name</label>
            <Field name="event_name" component="input" type="text" />
          </div>
          <div>
            <label htmlFor="event_name">Event Name</label>
            <Field name="event_name" component="input" type="text" />
          </div>
          <div>
            <label htmlFor="event_name">Event Name</label>
            <Field name="event_name" component="input" type="text" />
          </div>
          <div>
            <label htmlFor="event_name">Event Name</label>
            <Field name="event_name" component="input" type="text" />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  // a unique name for the form
  form: "CreateEventForm"
})(CreateEventForm);

// registration_closed_date
// presenters
// is_family_friendly
// minimum_age
// event_category
// published
// status
// images
// event_capacity