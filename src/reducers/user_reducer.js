import axios from "axios";
import { NotificationManager } from "react-notifications";
const {userLoggedOut, userEdited, userLoggedIn, userCreated} = require("../actions/user_actions");
require("dotenv").config();

const initialState = {
  religions: [
    "agnostic",
    "anglican",
    "assyrian apostolic",
    "atheist",
    "australian aboriginal traditonal religions",
    "baptist",
    "buddhism",
    "catholic",
    "eastern orthodox",
    "hinduism",
    "islam",
    "jehovah witness",
    "judaism",
    "later-day saints",
    "lutheran",
    "other religion",
    "other christian",
    "preferred not to indicate",
    "presbyterian",
    "salvation army",
    "secular beliefs",
    "seventh-day adventist",
    "torres strait islander spirituality",
    "uniting church",
    "unspecified"
  ],

  sexes: ["male", "female", "others", "unspecified"],

  userLoggedIn: false,

  message: "Welcome!",

  token: "",

  username: "",

  isAdmin: false
};


function storeToken(username, token) {
  if (typeof Storage !== "undefined") {
    localStorage.weexplore_token = token;
    localStorage.username = username;
  }
}

export const editUser = user => {
  return dispatch => {
    console.log(user);
    axios
      .patch(`${process.env.REACT_APP_BACKEND_DB_URL}/users/update`, user, {
        headers: {
          authorization: `${localStorage.weexplore_token}`
        }
      })
      .then(response => {
        console.log(response);
        dispatch(userEdited(response.data));
        if (response) {
          console.log(response);
          if (response.statusText === "OK") {
            localStorage.message = "Successfully Updated Account";
            window.location.href = "/";
          }
        }
      })
      .catch(err => {
        console.error("Error: " + err);
      });
  };
};

export const userLogin = user => {
  return dispatch => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_DB_URL}/users/login`, {
        username: user.username,
        password: user.password
      })
      .then(response => {
        dispatch(userLoggedIn(user.username, response.data));
        storeToken(user.username, response.data.token);
        if (response.statusText === "OK") {
          localStorage.message = "You Have Successfully Logged In";
          window.location.href = "/";
        }
      })
      .catch(err => {
        console.error("Error: " + err);
        NotificationManager.warning(
          null,
          "Incorrect Email or Password, Please try again"
        );
      });
  };
};

export const logUserOut = () => {
  return dispatch => {
    dispatch(userLoggedOut("You've been logged out."));
  };
};

export const logout = () => {};

export const createUser = user => {
  console.log(user);
  return dispatch => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_DB_URL}/users/create`, {
        username: user.username,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        sex: user.sex,
        newsletter: user.newsletter,
        religion: user.religion,
        interests: user.interests,
        age: user.age
      })
      .then(response => {
        dispatch(userCreated(response.data));
        console.log(response.data.success);
        if (response.data.success) {
          localStorage.message =
            "Account Successfully Created, Please Log In Again";
          window.location.href = "/login";
        }
      })
      .catch(err => {
        console.error("Error: " + err);
      });
  };
};

const userReducer = (state = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case "USER_CREATED":
      newState = { ...state, message: "Your account has been created." };
      break;

    case "USER_EDITED":
      newState = { ...state, message: "Account updated" };
      break;
    case "USER_LOGGED_IN":
      newState = {
        ...state,
        token: action.data.token,
        userLoggedIn: true,
        isAdmin: action.data.isAdmin,
        username: action.username,
        message: "You are logged in."
      };
      break;
    case "USER_LOGGED_OUT":
      newState = {
        ...state,
        token: null,
        userLoggedIn: false,
        username: "",
        message: "You have been logged out."
      };
      break;
    default:
      newState = { ...state };
      break;
  }
  return newState;
};

export default userReducer;
