import React, { Component } from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import RenderTextField from "./RenderTextField";
import { connect } from "react-redux";
import { DropdownList } from "react-widgets";


// packages for retrieving presenters data
import { Multiselect } from "react-widgets";
import axios from "axios";
import { populatePresenters } from "../reducers/presenter_reducer";

require("dotenv").config();

function mapStateToProps(state) {
  return {
    categories: state.eventReducer.event_categories,
    status: state.eventReducer.event_statuses,
    selectedPresenters: state.presenterReducer.selectedPresenters,
    presenters: state.presenterReducer.presenters
  };
}

const mapDispatchToProps = {
  populatePresenters
};

class CreateEventForm extends Component {
  // Brings in presenters data
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

  printPresenters = ({ input, name, label }) => {
    let emptyArray = [];
    this.props.presenters.map(presenter => {
      emptyArray.push({
        id: presenter._id,
        name: `${presenter.first_name} ${presenter.last_name} ${presenter.qualification}`
      });
    });
    return (
      <div>
        {label}:
        <Multiselect
          {...input}
          name={name}
          data={emptyArray}
          valueField="id"
          textField="name"
          onBlur={this.props.onBlur}
          allowCreate={true}
          onCreate={(name) => this.input.push(name)}
          value={input.value !== "[]" ? [...input.value] : "[]"}
        />
      </div>
    );
  };

  RenderCategoriesField = ({
    input,
    name,
    label,
    meta: { touched, error, warning }
  }) => {
    const { categories } = this.props;
    return (
      <div className="My-Radio">
        {label}:
        <DropdownList
          {...input}
          name={name}
          data={categories}
          value={input.value}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    );
  };

  RenderStatusField = ({
    input,
    name,
    label,
    meta: { touched, error, warning }
  }) => {
    const { status } = this.props;
    return (
      <div className="My-Radio">
        {label}:
        <DropdownList
          {...input}
          name={name}
          data={status}
          value={input.value}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    );
  };

  RenderPresentersData = () => {
    if (this.props.selectedPresenters) {
      console.log(this.props.selectedPresenters);
    }
  };

  render() {
    return (
      <div>
        <h1>Create an Event</h1>
        <form onSubmit={this.props.handleSubmit}>
          <Field
            name="event_name"
            component={RenderTextField}
            type="text"
            label="Event Name"
          />
          <Field
            name="description"
            component={RenderTextField}
            type="textarea"
            label="Description"
          />
          <Field
            name="event_date"
            component={RenderTextField}
            type="date"
            label="Event Date"
          />
          <Field
            name="event_start_time"
            component={RenderTextField}
            type="time"
            label="Event Start Time"
          />
          <Field
            name="event_end_time"
            component={RenderTextField}
            type="time"
            label="Event End Time"
          />
          <Field
            name="registration_closed_date"
            component={RenderTextField}
            type="date"
            label="Registration close date"
          />
          <Field
            name="selectedPresenters"
            component={this.printPresenters}
            label="Presenters"
            
          />

          <br />
          <Field
            name="is_family_friendly"
            component={RenderTextField}
            type="checkbox"
            label="Family Friendly"
          />
          <Field
            name="minimum_age"
            component={RenderTextField}
            type="number"
            label="Minimum Age"
          />
          <Field
            name="event_category"
            component={this.RenderCategoriesField}
            type="text"
            label="Event Category"
          />
          <Field
            name="status"
            component={this.RenderStatusField}
            type="text"
            label="Status"
          />
          <Field
            name="images"
            component={RenderTextField}
            type="text"
            label="Upload Images"
          />
          <Field
            name="event_capacity"
            component={RenderTextField}
            type="number"
            label="Event Capacity"
          />
          <Field
            name="published"
            component={RenderTextField}
            type="checkbox"
            label="Published"
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "CreateEventForm"
})(connect(mapStateToProps, mapDispatchToProps)(CreateEventForm));
