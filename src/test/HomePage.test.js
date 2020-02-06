import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("User can navigate to different links from the home page", () => {
  it("Tests if the home page renders", () => {
    const { queryByText } = render(<App />);
    expect(queryByText('A community interested in healthy living')).toBeInTheDocument();
  });

  it("Loads the home page and stimulates the click to login page", () => {
    const { queryByText } = render(<App />);
    expect(queryByText("Sign Up")).toBeNull();
    fireEvent.click(queryByText("Log In"));
    expect(queryByText("Sign Up")).toBeInTheDocument();
  })
})
