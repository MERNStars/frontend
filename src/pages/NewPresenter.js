import React, { Component } from "react";
import AddNewPresenter from "../components/Presenters/AddNewPresenter";
import Axios from "axios";

require("dotenv").config();

const token = {
  authorization: `${localStorage.weexplore_token}`
}

class NewPresenter extends Component {
  handleSubmit = data => {
    console.log(data);
    try {
      Axios.post(
        `${process.env.REACT_APP_BACKEND_DB_URL}/presenters/create`,
        data,
        {
          headers: token
        }
      )
        .then(response => {
          console.log(response);
          if (response.statusText === "Created") {
            this.props.history.goBack()
          }
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


export default NewPresenter