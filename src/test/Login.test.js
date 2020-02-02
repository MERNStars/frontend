import LoginForm from "../components/LoginForm";
import { shallow } from "enzyme";
import React from "react";

describe("Login Component", () => {
  it("checks if initiate states are null", () => {
    const wrapper = shallow(<LoginForm />);
    state = { username: "" };
    expect(wrapper.contain(state)).toEqual(nill);
  });
});
