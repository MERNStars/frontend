import { combineReducers } from "redux";
import userReducer from "./user_reducer";
import presenterReducer from "./presenter_reducer";
import eventReducer from "./event_reducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  userReducer,
  presenterReducer,
  eventReducer,
  form: formReducer
});
