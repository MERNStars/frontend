import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { renderPresentersField } from "../../FormFields/FormFields";

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
      <h4>Or Add new presenter</h4>
      <button>
        <Link to="/create-presenter">Create Presenter</Link>
      </button>

      <div>
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" className="next">
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
