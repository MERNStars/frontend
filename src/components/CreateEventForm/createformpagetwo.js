import React from "react";
import { Field, reduxForm } from "redux-form";
import { Multiselect } from "react-widgets";
import { Link } from "react-router-dom";

const renderPresentersField = ({ input, name, label, presenters, onBlur }) => {
  let emptyArray = [];
  presenters.map(presenter => {
    emptyArray.push({
      id: presenter._id,
      name: `${presenter.first_name} ${presenter.last_name} ${presenter.qualification}`
    });
  });
  return (
    <>
      {label}:
      <Multiselect
        {...input}
        name={name}
        data={emptyArray}
        textField="name"
        onBlur={onBlur}
        value={input.value !== "[]" ? [...input.value] : "[]"}
      />
    </>
  );
};

const WizardFromSecondPage = props => {
  const { handleSubmit, presenters, previousPage } = props;

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
