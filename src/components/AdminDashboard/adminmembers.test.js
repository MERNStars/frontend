import React from "react";
import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import wrapper from "../../test/Wrapper";
import AdminMembers from "./adminmembers";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

let mock = new MockAdapter(axios);
require("dotenv").config();

jest.setTimeout(10000);

afterEach(cleanup);

describe("<AdminMembers />", () => {
  const mockData = [
    {
      first_name: "John",
      last_name: "Smith",
      age: 30,
      sex: "male",
      username: "test@test.com",
      interests: []
    }
  ];
  it("Renders the component and tests if data is mounted", async () => {
    mock
      .onGet(`${process.env.REACT_APP_BACKEND_DB_URL}/users`)
      .reply(200, mockData);
    const { getByText } = render(wrapper(<AdminMembers />));
    await wait(() => expect(getByText("John Smith")).toBeInTheDocument());
  });

  it("Returns null when axios call fails", async () => {
    mock
      .onGet(`${process.env.REACT_APP_BACKEND_DB_URL}/users`)
      .reply(400, mockData);
    const { queryByText } = render(wrapper(<AdminMembers />));
    await wait(() => expect(queryByText("John Smith")).toBeNull());
  });

  
});
