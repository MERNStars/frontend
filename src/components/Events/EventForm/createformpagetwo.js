import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { renderPresentersField } from "../../FormFields/FormFields";
import styles from '../../../styles/form.module.scss';
import {Button, Icon} from 'semantic-ui-react';

const WizardFromSecondPage = props => {
  const [presenters, setPresenters] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_DB_URL}/presenters/`, {
        headers: {
          authorization: `${localStorage.weexplore_token}`
        }
      })
      .then(response => setPresenters(response.data));
  });
  const { handleSubmit, previousPage } = props;

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add existing presenters</h4>
      <Field
        name="selectedPresenters"
        component={renderPresentersField}
        presenters={presenters}
        label="Presenters"
      />
      <Button id={styles.presenterButton} basic icon labelPosition='left'>
      <Icon name='add user' />
        <Link to="/create-presenter">Add New Presenter</Link>
      </Button>

      <div>
        <button type="button" className={styles.NextButton} id={styles.PreviousButton} onClick={previousPage}>
          Previous
        </button>
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
  forceUnregisterOnUnmount: true
})(WizardFromSecondPage);
