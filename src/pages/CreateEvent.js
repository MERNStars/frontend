import React, { Component } from "react";
import CreateEventForm from "../components/CreateEventForm";

export default class CreateEvent extends Component {
  state = {
    event: null
  };

  render() {
    return (
      <div>
        <CreateEventForm />
      </div>
    );
  }
}
