import React from "react";
import axios from "axios";
import { Field, FieldArray, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { populatePresenters } from "../reducers/presenter_reducer";
require("dotenv").config();

function mapStateToProps(state) {
  return {
    presenters: state.presenterReducer.presenters
  };
}

const mapDispatchToProps = {
  populatePresenters
};

class RenderPresentersField extends React.Component {
  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );

  renderPresenters = ({
    fields,
    meta: { error, submitFailed },
    submitting
  }) => {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <ul>
          {fields.map((presenter, index) => (
            <li key={index}>
              <h4>Presenter #{index + 1}</h4>
              <Field name={presenter} component="select">
                <option />
                {this.props.presenters
                  ? this.props.presenters.map(presenter => {
                      return (
                        <option value={presenter._id}>
                          {presenter.first_name} {presenter.last_name}
                          {presenter.qualification}
                        </option>
                      );
                    })
                  : null}
              </Field>
              <button
                type="button"
                title="Remove Presenter"
                onClick={() => fields.remove(index)}
              >
                Remove Presenter
              </button>
            </li>
          ))}
          <li>
            <button type="button" onClick={() => fields.push({})}>
              Add Presenter
            </button>
            {submitFailed && error && <span>{error}</span>}
          </li>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
        </ul>
      </form>
    );
  };

  async componentDidMount() {
    const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_DB_TEST}/presenters/`, {
        headers: {
          authorization: `${localStorage.weexplore_token}`
        }
      })
      .catch(error => {
        console.log(`ERROR: ${error}`);
      });

    const data = await response.data;
    this.props.populatePresenters(data);
  }

  render() {
    return (
      <div>
        <FieldArray
          name="presenters"
          component={this.renderPresenters}
          onSubmit={this.submit}
        />
      </div>
    );
  }
}

export default reduxForm({ form: "RenderPresentersField" })(
  connect(mapStateToProps, mapDispatchToProps)(RenderPresentersField)
);
