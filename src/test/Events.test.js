import { CreateEvent } from "../pages/CreateEvent";
import CreateEventForm from "../components/Events/EventForm/CreateEventForm";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import store from "../store";

function wrapper(component) {
  return <Provider store={store}>{component}</Provider>;
}

describe("Create Event Component", () => {
  // console.log(render(wrapper(<CreateEvent />)).debug());
  const { queryByText, getByText, getAllByText } = render(
    wrapper(<CreateEvent />)
  );
  it("tests if create event component renders", () => {
    expect(queryByText("Event Name")).toBeInTheDocument();
    expect(queryByText("Event Capacity")).toBeInTheDocument();
  });
  it("presses the next button and renders the next component", () => {
    const nextPage = getAllByText("button");
    console.log(nextPage);

    // fireEvent.click(queryAllByText("Next"));
  });

  // Tests go above this line
});
