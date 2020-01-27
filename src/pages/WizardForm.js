import React, { Component } from "react";
import WizardFormFirstPage from "../components/createformpageone";
import WizardFormThirdPage from "../components/createformpagethree";
// import CreateEventForm from "../components/CreateEventForm";

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  handleSubmit = data => {
    console.log(data);
  };

  render() {
    const { handleSubmit } = this.props;
    const { page } = this.state;
    return (
      <div>
        {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage} />}
        {page === 2 && (
          <WizardFormThirdPage
            previousPage={this.previousPage}
            onSubmit={this.handleSubmit}
          />
        )}
      </div>
    );
  }
}

export default WizardForm;
