import { CreateEvent } from "../pages/CreateEvent";
import CreateEventForm from "../components/CreateEventForm";
import WizardFormFirstPage from '../components/CreateEventForm/createformpageone'
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import store from "../store";
import { shallow, mount } from "enzyme";

function wrapper(component) {
  return <Provider store={store}>{component}</Provider>;
}

describe("Create Event Component", () => {
  it("tests if create event component renders", () => {
    const { queryByText } = render(
      wrapper(<CreateEvent />)
    );

    console.log(render(
      wrapper(<CreateEvent />)
    ).debug())

    // expect(queryByText(/Event Name/)).toBeInTheDocument();
    // fireEvent.click(queryByText(`type="submit"`));

  });

  // Tests go above this line
});
