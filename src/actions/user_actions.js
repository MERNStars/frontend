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

module.exports = {userLoggedOut, userEdited, userLoggedIn, userCreated};