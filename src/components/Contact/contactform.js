import React from "react";
import { Field, reduxForm } from "redux-form";

function validate(values) {
  let errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
}

class ContactForm extends React.Component {
  renderField({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          name="name"
          component={this.renderField}
          type="text"
          label="name"
        />
        <Field
          name="email"
          component={this.renderField}
          type="email"
          label="email"
        />
        <Field
          name="subject"
          component={this.renderField}
          type="text"
          label="subject"
        />
        <Field
          name="text"
          component={this.renderField}
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
