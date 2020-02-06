import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import wrapper from "../../test/Wrapper";
import ContactForm from "./contactform";

afterEach(cleanup);

describe("<ContactForm />", () => {
  it("checks if contact form has rendered its form fields", () => {
    const { getByText } = render(wrapper(<ContactForm />));
    expect(getByText("Email")).toBeInTheDocument();
    expect(getByText("Submit")).toBeInTheDocument();
  });
  it("inputs data into form field", () => {
    
    const { getByLabelText } = render(wrapper(<ContactForm />));
    fireEvent.change(getByLabelText("Email"), {target: {value: 'test@test.com'}})
    expect(getByLabelText("Email").value).toBe('test@test.com')
  })
  it("checks if submit button has been called",() => {
    const onSubmit = jest.fn();
    const { getByText } = render(wrapper(<ContactForm handleSubmit={onSubmit}/>));
    fireEvent.submit(getByText("Submit"));
    expect(onSubmit).toHaveBeenCalled();
  })
});
