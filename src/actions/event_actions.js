const populateEvents = events => {
  return {
    type: "POPULATE_EVENTS",
    data: events
  };
};

const deleteEvents = events => {
  return {
    type: "EVENT_DELETED",
    data: events
  };
};

const eventCreated = message => ({
  type: "EVENT_CREATED",
  message: message
});

const eventUpdated = data => ({
  type: "EVENT_EDITED",
  data: data
});

const newImage = data => ({
  type: "NEW_IMAGE",
  data: data
});

const noImage = () => ({
  type: "RESET_IMAGE"
});

const updateEvents = events => {
  return {
    type: "UPDATE_EVENTS",
    data: events
  };
};

module.exports = {populateEvents, deleteEvents, updateEvents, noImage, newImage, eventUpdated, eventCreated};