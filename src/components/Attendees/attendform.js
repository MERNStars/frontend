import React, { Component } from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import { withRouter } from "react-router-dom";
import { RenderTextField, CustomFriendsFriend } from "../FormFields/FormFields";
import styles from "../../styles/form.module.scss";

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
            className={styles.NextButton} 
            id={styles.RemoveButton}
          >
            Remove Friend
          </button>
        </li>
      ))}
      <li>
        <button type="button" onClick={() => fields.push()} className={styles.NextButton} id={styles.AddButton}>
          Bring A Friend
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
            label={`Dependent #${index + 1}`}
          />
          <Field
            name={`${dependents}.age`}
            type="number"
            component={RenderTextField}
            label={`Age`}
          />
          <button
            type="button"
            title="Remove Friend"
            onClick={() => fields.remove(index)}
            className={styles.NextButton} 
            id={styles.RemoveButton}
          >
            Remove Dependent
          </button>
        </li>
      ))}
      <li>
        <button type="button" onClick={() => fields.push()} className={styles.NextButton} id={styles.AddButton}>
          Bring Dependent
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
          <h2>Can't wait to see you there!</h2>
          <FieldArray name={`friends`} component={this.renderFriends} />
          <FieldArray name={`dependents`} component={this.renderDependents} />
          <button type="submit" disabled={this.props.submitting} className={styles.NextButton}>
            Attend Event
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(reduxForm({ form: "AttendForm" })(AttendForm));
