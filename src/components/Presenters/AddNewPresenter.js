import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import {RenderTextField, RenderImageField} from '../FormFields/FormFields'
import styles from '../../styles/form.module.scss';

class AddNewPresenter extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Add New Presenter</h2>
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
            name="title"
            component={RenderTextField}
            type="text"
            label="Title"
          />
          <Field
            name="qualification"
            component={RenderTextField}
            type="text"
            label="Qualification"
          />
          <Field
            name="short_description"
            component={RenderTextField}
            type="text"
            label="Short Description"
          />
          <Field
            name="long_description"
            component={RenderTextField}
            type="textarea"
            label="Long Description"
          />
          <Field
            name="avatar"
            component={RenderImageField}
            type="textarea"
            label="Upload Avatar"
          />
          <button type="submit" disabled={submitting} className={styles.NextButton}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "createPresenterForm"
})(AddNewPresenter);
