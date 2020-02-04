import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import wrapper from "../../test/Wrapper";
import AddNewPresenter from "./AddNewPresenter";

afterEach(cleanup);
describe("AddNewPresenter Component", () => {
  it("Renders AddNewPresenter Form", () => {
    const { getByText } = render(wrapper(<AddNewPresenter />));
    expect(getByText("First Name")).toBeInTheDocument()
    expect(getByText("Long Description")).toBeInTheDocument()
  });
  it("Tests an input and checks if value matches", () => {
    const { getByLabelText } = render(wrapper(<AddNewPresenter />));
    fireEvent.change(getByLabelText("First Name"), {target: {value: "John"}})
    expect(getByLabelText("First Name").value).toBe("John")
  })
  it("Handles the submit button", () => {
    const onSubmit = jest.fn();
    const { getByText } = render(wrapper(<AddNewPresenter handleSubmit={onSubmit}/>));
    fireEvent.submit(getByText("Submit"));
    expect(onSubmit).toHaveBeenCalled();
  })
});
