import React from "react";
import { RenderCategoriesField } from "../../FormFields/FormFields";
import { Field, reduxForm } from "redux-form";

import { connect } from "react-redux";
import validate from "../../FormFields/validate";
import {RenderTextField, RenderStatusField, RenderTextArea, RenderCheckBox, RenderSmallTextField} from '../../FormFields/FormFields'
import styles from '../../../styles/form.module.scss';


function mapStateToProps(state) {
  return {
    categories: state.eventReducer.event_categories,
    status: state.eventReducer.event_statuses
  };
}

const WizardFormFirstPage = props => {
  const { categories, status, handleSubmit, initialValues } = props;
  return (
    
    <form onSubmit={handleSubmit}>
      <h2>Create a new event</h2>
      <Field
        name="event_name"
        component={RenderTextField}
        type="text"
        label="Event Name"
      />
      <Field
        name="description"
        component={RenderTextArea}
        type="textarea"
        label="Description"
        className={styles.description}
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
        component={RenderCheckBox}
        className={styles.Checkbox}
        type="checkbox"
        label="Family Friendly"
      />
      <Field
        name="minimum_age"
        component={RenderSmallTextField}
        type="number"
        label="Minimum Age"
        className={styles.SmallInput}
      />
      <Field
        name="event_capacity"
        component={RenderSmallTextField}
        type="number"
        label="Event Capacity"
        className={styles.SmallInput}
      />
      <Field
        name="event_category"
        component={RenderCategoriesField}
        categories={categories}
        type="text"
        label="Event Category"
        className={styles.Categories}
      />
      {initialValues && initialValues.status ? (
        <Field
          name="status"
          component={RenderStatusField}
          status={status}
          type="text"
          label="Status"
        />
      ) : null}

      <div>
        <button type="submit" className={styles.NextButton}>
          Next
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "wizard",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(connect(mapStateToProps)(WizardFormFirstPage));
