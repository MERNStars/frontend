import React, { Component } from "react";
import AddNewPresenter from "../components/AddNewPresenter";
import Axios from "axios";

require("dotenv").config();

export default class NewPresenter extends Component {
  handleSubmit = data => {
    console.log(data);
    try {
      Axios.post(
        `${process.env.REACT_APP_BACKEND_DB_TEST}/presenters/create`,
        data,
        {
          headers: {
            authorization: `${localStorage.weexplore_token}`
          }
        }
      )
        .then(response => {
          console.log(response.data);
          this.props.history.goBack()
        })
    } catch (error) {
      console.log(`You have an error: ${error}`);
    }
  };

  render() {
    return (
      <>
        <AddNewPresenter onSubmit={this.handleSubmit} />
      </>
    );
  }
}
