import React, { Component } from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import { withRouter } from "react-router-dom";
import { RenderTextField, CustomFriendsFriend } from "../FormFields/FormFields";

export class AttendForm extends Component {
  // Form Field To Render Input For Adding Friends
  renderFriends = ({ fields, meta: { error } }) => (
    <ul>
      {fields.map((friends, index) => (
        <li key={index}>
          <Field
            name={friends}
            type="text"
            component={CustomFriendsFriend}
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

  // Form Field To Render Input For Adding Dependents
  renderDependents = ({ fields, meta: { error } }) => (
    <ul>
      {fields.map((dependents, index) => (
        <li key={index}>
          <Field
            name={`${dependents}.name`}
            type="text"
            component={RenderTextField}
            label={`dependent #${index + 1}`}
          />
          <Field
            name={`${dependents}.age`}
            type="number"
            component={RenderTextField}
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

export default withRouter(reduxForm({ form: "AttendForm" })(AttendForm));
