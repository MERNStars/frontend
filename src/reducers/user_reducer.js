import axios from "axios";
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

const userCreated = message => ({
  type: "USER_CREATED",
  message: message
});

const userLoggedIn = (username, data) => ({
  type: "USER_LOGGED_IN",
  username: username,
  data: data
});

const userEdited = data => ({
  type: "USER_EDITED",
  data: data
});

const userLoggedOut = message => ({
  type: "USER_LOGGED_OUT",
  message: message
});

function storeToken(username, token) {
  if (typeof Storage !== "undefined") {
    localStorage.weexplore_token = token;
    localStorage.username = username;
  }
}

export const editUser = user => {
  return dispatch => {
    axios
      .patch(`${process.env.REACT_APP_BACKEND_DB_URL}/users/update`, user, {
        headers: {
          authorization: `${localStorage.weexplore_token}`
        }
      })
      .then(response => {
        dispatch(userEdited(response.data));
        if (response) {
          console.log(response)
          // window.location.reload(true);
        }
      })
      .catch(error => console.log("error:" + error));
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
        window.location.reload(true);
      })
      .catch(err => console.error("Error xxxx: " + err));
  };
};

export const logUserOut = () => {
  return dispatch => {
    dispatch(userLoggedOut("You've been logged out."));
    window.location.href = "/"
  };
};

export const logout = () => {};

export const createUser = user => {
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
