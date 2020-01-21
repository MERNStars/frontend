import React, { Component } from "react";
import RenderPresentersField from "../components/RenderPresentersField";
import { selectPresenters } from "../reducers/presenter_reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
require("dotenv").config();

function mapStateToProps(state) {
  return { selectedPresenters: state.presenterReducer.selectedPresenters };
}

const mapDispatchToProps = dispatch => {
  return {
    selectPresenters: data => {
      dispatch(selectPresenters(data));
    }
  };
};

class Presenters extends Component {
  submit = data => {
    console.log(data.presenters);
    this.props.selectPresenters(data.presenters);
    this.props.history.push(`/create-event`);
  };

  render() {
    return (
      <div>
        <RenderPresentersField onSubmit={this.submit} />
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Presenters)
);
