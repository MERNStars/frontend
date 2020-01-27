import React from "react";
import { Field, reduxForm } from "redux-form";

const RenderTextField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const WizardFormFirstPage = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
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
        name="event_capacity"
        component={RenderTextField}
        type="number"
        label="Event Capacity"
      />
      <div>
        <button type="submit" className="next">
          Next
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "wizard", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
  // validate
})(WizardFormFirstPage);
