import React, { Component } from "react";
import axios from "axios";
import { Field, reduxForm, FieldArray } from "redux-form";

class AttendForm extends Component {
  submit = data => {
    console.log(data);
  };

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

  renderFriends = ({ fields, meta: { error } }) => (
    <ul>
      {fields.map((friends, index) => (
        <li key={index}>
          <Field
            name={friends}
            type="text"
            component={this.renderField}
            label={`Friend #${index + 1}`}
          />
          <button
            type="button"
            title="Remove Friend"
            onClick={() => fields.remove(index)}
          >
            Remove Friend
          </button>
        </li>
      ))}
      <li>
        <button type="button" onClick={() => fields.push()}>
          Add Friend
        </button>
      </li>
      {error && <li>{error}</li>}
    </ul>
  );

  renderDependents = ({ fields, meta: { error } }) => (
    <ul>
      {fields.map((dependents, index) => (
        <li key={index}>
          <Field
            name={`${dependents}.name`}
            type="text"
            component={this.renderField}
            label={`dependent #${index + 1}`}
          />
          <Field
            name={`${dependents}.age`}
            type="number"
            component={this.renderField}
            label={`age`}
          />
          <button
            type="button"
            title="Remove Friend"
            onClick={() => fields.remove(index)}
          >
            Remove Dependent
          </button>
        </li>
      ))}
      <li>
        <button type="button" onClick={() => fields.push()}>
          Add Dependent
        </button>
      </li>
      {error && <li>{error}</li>}
    </ul>
  );

  render() {
    const { event } = this.props;
    console.log(event.event_name);
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <FieldArray name={`friends`} component={this.renderFriends} />
          <FieldArray name={`dependents`} component={this.renderDependents} />
          <button type="submit" disabled={this.props.submitting}>
            Attend
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: "AttendForm" })(AttendForm);
