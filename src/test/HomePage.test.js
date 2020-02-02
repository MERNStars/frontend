import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import CreateEventForm from "../components/CreateEventForm";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

beforeEach(() => {
  let mock = new MockAdapter(axios);
  const data = {
    name: "test",
    age: 100
  };

  console.log(data);

  mock.onGet("url").reply(200, data);
});

test("test if navbar renders on home page", () => {
  const { getByText, queryByText, querySelector, container } = render(<App />);
  expect(getByText("Events")).toBeInTheDocument();
  expect(queryByText("Login")).toBeNull();
  fireEvent.click(getByText("Log In"));
  expect(getByText("Sign Up")).toBeInTheDocument();
});

// test("test if create form component renders", () => {
//   const { getByText } = render(<CreateEventForm />);
// });
