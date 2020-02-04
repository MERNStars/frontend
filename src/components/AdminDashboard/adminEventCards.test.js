import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import wrapper from "../../test/Wrapper";
import AdminEventCard from './adminEventCards'
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

describe("<AdminEventCard />", () => {
  it("Test if card renders", () => {
    const { getByText } = render(wrapper(<BrowserRouter><AdminEventCard event_name="Test Event Name" event_date={{begin: Date.now()}}/></BrowserRouter>));
    expect(getByText("Test Event Name")).toBeInTheDocument()
  })
  // it("tests if component did mount returns data", () => {
  //   jest.spyOn(AdminEventCard.prototype,"componentDidMount")
  // })

})