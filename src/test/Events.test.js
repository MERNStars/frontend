import { CreateEvent } from "../pages/CreateEvent";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import store from "../store";

function wrapper(component) {
  return <Provider store={store}>{component}</Provider>;
}

describe("Create Event Component", () => {
  it("tests if create event component renders", () => {
    const { queryByText } = render(
      wrapper(<CreateEvent />)
    );

    expect(queryByText(/Event Name/)).toBeInTheDocument();
    // fireEvent.click(queryByText(`type="submit"`));
  });

  // Tests go above this line
});
