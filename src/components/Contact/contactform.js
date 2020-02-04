import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from '../FormFields/validate';
import {RenderTextField} from '../FormFields/FormFields'

class ContactForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name="name"
          component={RenderTextField}
          type="text"
          label="name"
        />
        <Field
          name="email"
          component={RenderTextField}
          type="email"
          label="email"
        />
        <Field
          name="subject"
          component={RenderTextField}
          type="text"
          label="subject"
        />
        <Field
          name="text"
          component={RenderTextField}
          type="textarea"
          label="text"
        />
        <div>
          <button type="submit" disabled={this.props.submitting}>
            Submit
          </button>
          <button
            type="button"
            disabled={this.props.pristine || this.props.submitting}
            onClick={this.props.reset}
          >
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({ form: "ContactForm", validate })(ContactForm);
