import {AttendForm} from "./attendform";
import React from "react";
import { reduxForm } from 'redux-form';
import { render, fireEvent,cleanup } from "@testing-library/react";
import wrapper from "../../test/Wrapper";
const Decorated = reduxForm({form: 'testForm'})(AttendForm)

afterEach(cleanup)

describe("Attend Form", () => {
  const { getByText } = render(wrapper(<Decorated />));
  it("renders the attend form", () => {
    expect(getByText('Add Friend')).toBeInTheDocument()
    expect(getByText('Add Dependent')).toBeInTheDocument()
  })
  it("Adds a form field when the button Add Friend is clicked",() => {
    const { getByText } = render(wrapper(<Decorated />));
    fireEvent.click(getByText('Add Friend'))
    expect(getByText("Friend #1")).toBeInTheDocument()
    fireEvent.click(getByText('Add Friend'))
    expect(getByText("Friend #2")).toBeInTheDocument()
  })
  it("Inputs a name into the friend field", () => {
    const { getByText,getByLabelText } = render(wrapper(<Decorated />));
    fireEvent.click(getByText('Add Friend'))
    fireEvent.change(getByLabelText("Friend #1"), {target: {value: 'Hello World'}})
    expect(getByLabelText("Friend #1").value).toBe('Hello World')
  })
  it("removes a form field when the button remove friend is clicked", () => {
    const { getByText,queryByText } = render(wrapper(<Decorated />));
    fireEvent.click(getByText('Add Friend'))
    expect(getByText("Friend #1")).toBeInTheDocument()
    fireEvent.click(getByText("Remove Friend"))
    expect(queryByText("Remove Friend")).toBeNull()
  })
  it("Adds a form field when Add Dependent is clicked",() => {
    const { getByText } = render(wrapper(<Decorated />));
    fireEvent.click(getByText('Add Dependent'))
    expect(getByText("dependent #1")).toBeInTheDocument()
    expect(getByText("age")).toBeInTheDocument()
  })
  it("Removes form field when Remove Dependent is clicked", () => {
    const { getByText,queryByText } = render(wrapper(<Decorated />));
    fireEvent.click(getByText('Add Dependent'))
    expect(queryByText("dependent #1")).toBeInTheDocument()
    fireEvent.click(getByText('Remove Dependent'))
    expect(queryByText("dependent #1")).toBeNull()
  })
  
});
