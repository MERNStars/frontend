import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';

// const initialState = { message: 'Welcome to WeExplore' };
// Axios.get to get all events
export default createStore(allReducers, applyMiddleware(thunk));