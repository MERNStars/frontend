import {combineReducers} from 'redux';
import userReducer from './user_reducer';
import presenterReducer from './presenter_reducer';
import eventReducer from './event_reducer';

export default combineReducers({
    userReducer, presenterReducer, eventReducer
});