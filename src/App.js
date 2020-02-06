import React from "react";
import "./App.css";
import Router from "./routes/index";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { Provider } from "react-redux";

import store from "./store";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NotificationContainer />
        <div>
          <Router />
        </div>
      </Provider>
    );
  }
}

export default App;
