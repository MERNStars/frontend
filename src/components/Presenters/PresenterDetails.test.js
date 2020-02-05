import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import wrapper from "../../test/Wrapper";
import Presenters from "./PresenterDetails";

afterEach(cleanup);

describe("<Presenter />", () => {
  it("Renders presents component from path admin", () => {
    const { getByText } = render(
      wrapper(
        <Presenters
          presenters={[
            {
              title: "Dr",
              first_name: "Jon",
              last_name: "Smith"
            }
          ]}
          location={{ pathname: "/admin" }}
        />
      )
    );
    expect(getByText("Dr Jon Smith")).toBeInTheDocument()
  });
  it("Renders presents component from path events page", () => {
    const { getByText } = render(
      wrapper(
        <Presenters
        presenter_detail={[
            {
              title: "Dr",
              first_name: "Jon",
              last_name: "Smith",
              qualification: "PHD",
              long_description: "Test Test Test"
            }
          ]}
          location={{ pathname: "/events" }}
        />
      )
    );
    expect(getByText("Dr Jon Smith")).toBeInTheDocument()
    expect(getByText("PHD")).toBeInTheDocument()
    expect(getByText("Test Test Test")).toBeInTheDocument()
  });
});
