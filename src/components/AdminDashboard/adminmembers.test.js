import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import wrapper from "../../test/Wrapper";
import AdminMembers from "./adminmembers";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

let mock = new MockAdapter(axios);
require("dotenv").config();

beforeEach(() => {
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
  mock
    .onGet(`${process.env.REACT_APP_BACKEND_DB_URL}/users`)
    .reply(200, mockData);
});

afterEach(cleanup);

describe("<AdminMembers />", () => {
  it("Renders the component", () => {
    const { getByText } = render(wrapper(<AdminMembers />));
    expect(getByText(/John/)).toBeInTheDocument();
  });
});
