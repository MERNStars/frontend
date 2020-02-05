import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import wrapper from "../../test/Wrapper";
import NavBar from './NavBar'
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

describe("Navbar Component", () => {
  it("Renders Navbar Component before user is logged in", () => {
    const { getByText } = render(wrapper(<BrowserRouter><NavBar /></BrowserRouter>));
    expect(getByText("Log In")).toBeInTheDocument();
  })
  it("Renders Admin version of Navbar", () => {
    Object.defineProperty(window, "localStorage", {
      value: {
        username: process.env.REACT_APP_ADMIN_ACC_1,
      },
      writable: true
    });
    const { getByText } = render(wrapper(<BrowserRouter><NavBar /></BrowserRouter>));
    expect(getByText("Admin")).toBeInTheDocument();
  })
})