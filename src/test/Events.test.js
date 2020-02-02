import { CreateEvent } from "../pages/CreateEvent";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import store from "../store";

function wrapper(component) {
  return <Provider store={store}>{component}</Provider>;
}

const expected = [
  <label>Event Name</label>,
  <label>Event Date</label>,
  <label>Event Start Time</label>,
  <label>Event End Time</label>,
  <label>Event Capacity</label>
];

describe("Create Event Component", () => {
  it("tests if create event component renders", () => {
    const { getByText,queryByText, getAllByText, getByType } = render(
      wrapper(<CreateEvent />)
    );

    const test = render(
      wrapper(<CreateEvent />))

    console.log(test)

    expect(screen.queryByText(/Event Name/)).toBeInTheDocument();
    fireEvent.click(queryByText(`type="submit"`));
  });

  // Tests go above this line
});
