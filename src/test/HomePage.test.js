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



describe("User can navigate to different links from the home page", () => {
  it("Tests if the home page renders", () => {
    const { queryByText } = render(<App />);
    expect(queryByText("Hello World")).toBeInTheDocument();
  });

  it("Loads the home page and stimulates the click to login page", () => {
    const { queryByText } = render(<App />);
    expect(queryByText("Sign Up")).toBeNull();
    fireEvent.click(queryByText("Log In"));
    expect(queryByText("Sign Up")).toBeInTheDocument();
  })
})
