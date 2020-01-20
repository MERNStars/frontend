import React from 'react';
import './App.css';
import Router from './routes/index';

import {Provider} from 'react-redux';

import store from './store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router />
        </div>
    </Provider>
      
    )
  }
}


export default App;
