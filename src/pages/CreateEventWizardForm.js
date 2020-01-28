import React, { Component } from "react";
import WizardFormFirstPage from "../components/CreateEventForm/createformpageone";
import WizardFormThirdPage from "../components/CreateEventForm/createformpagethree";
import WizardFromSecondPage from "../components/CreateEventForm/createformpagetwo";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import axios from "axios";
import PreviewForm from "../components/CreateEventForm/previewevent";
import { populatePresenters } from "../reducers/presenter_reducer";

function mapStateToProps(state) {
  return {
    presenters: state.presenterReducer.presenters
  };
}

const mapDispatchToProps = {
  populatePresenters
};

class CreateEventWizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.previewEvent = this.previewEvent.bind(this);
    this.state = {
      page: 1,
      event: ""
    };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  previewEvent(data) {
    this.setState({ event: data });
    this.setState({ page: this.state.page + 1 });
  }

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

  handleSubmit = data => {
    console.log(data);
  };

  render() {
    const { presenters } = this.props;
    const { page } = this.state;
    return (
      <div>
        {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage} />}
        {page === 2 && (
          <WizardFromSecondPage
            presenters={presenters}
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 3 && (
          <WizardFormThirdPage
            previousPage={this.previousPage}
            onSubmit={this.previewEvent}
          />
        )}
        {page === 4 && (
          <PreviewForm
            eventData={this.state.event}
            previousPage={this.previousPage}
            onSubmit={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}

export default reduxForm({
  form: "CreateEventForm"
})(connect(mapStateToProps, mapDispatchToProps)(CreateEventWizardForm));
