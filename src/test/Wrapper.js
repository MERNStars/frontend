import React from "react";
import store from "../store";
import { Provider } from "react-redux";

 function wrapper(component) {
  return <Provider store={store}>{component}</Provider>;
}

export default wrapper