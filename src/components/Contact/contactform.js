import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from '../FormFields/validate';
import {RenderTextField} from '../FormFields/FormFields'
import styles from '../../styles/form.module.scss';


class ContactForm extends React.Component {
  render() {
    return (
      <div className={styles.contactForm}>
      <form onSubmit={this.props.handleSubmit}>
        <h2>Send us a message</h2>
        <Field
          name="name"
          component={RenderTextField}
          type="text"
          label="Name"
        />
        <Field
          name="email"
          component={RenderTextField}
          type="email"
          label="Email"
        />
        <Field
          name="subject"
          component={RenderTextField}
          type="text"
          label="Subject"
        />
        <Field
          name="text"
          component={RenderTextField}
          type="textarea"
          label="Text"
        />
        <div>
          <button type="submit" disabled={this.props.submitting}>
            Submit
          </button>
          <button
            type="button"
            disabled={this.props.pristine || this.props.submitting}
            onClick={this.props.reset}
            id={styles.clearButton}
          >
            Clear Values
          </button>
        </div>
      </form>
    </div>
    );
  }
}

export default reduxForm({ form: "ContactForm", validate })(ContactForm);
