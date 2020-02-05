import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import wrapper from "../../test/Wrapper";
import AdminEvents from './adminevents'
afterEach(cleanup);

describe("<AdminEvents />", () => {
  it("renders the component", () => {
    const { getByText } = render(wrapper(<AdminEvents />));
    expect(getByText("Published Events")).toBeInTheDocument()
    expect(getByText("Create New Event")).toBeInTheDocument()
  })
  
})