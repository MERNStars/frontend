import Axios from "axios";

require("dotenv").config();
const initialState = {
  event_categories: [
    "bible seminar",
    "career seminar",
    "exercise class",
    "health seminar",
    "healthy cooking",
    "lifestyle change workshop",
    "mental health workshop",
    "massage service",
    "others",
    "addiction recovery",
    "weight-loss program"
  ],

  event_statuses: [
    "scheduled",
    "canceled",
    "postponed",
    "completed",
    "sold out"
  ],
  
    message: '',

    events: [],

    newImage: null
}

export const populateEvents = (events) => {
    return {
        type: "POPULATE_EVENTS",
        data: events
    }
}

export const deleteEvents = (events) => {
    return {
        type: "EVENT_DELETED",
        data: events
    }
}

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
})

export const updateEvents = (events) => {
  return {
    type: "UPDATE_EVENTS",
    data: events
  }
}

export const setNewImage = fileData => {
  return dispatch => {
    dispatch(newImage(fileData));
  }
}

export const resetNewImage = () => {
  return dispatch => {
    dispatch(noImage());
  }
}

export const createEvent = event => {
  return dispatch => {
    Axios.post(
      `${process.env.REACT_APP_BACKEND_DB_URL}/events/create`,
      {
        event_name: event.event_name,
        description: event.description,
        event_date: {
          begin: `${event.event_date}T${event.event_start_time}`,
          end: `${event.event_date}T${event.event_end_time}`
        },
        registration_closed_date: `${event.registration_closed_date}T23:55:55.000Z`,
        presenters: event.presenters,
        is_family_friendly: event.is_family_friendly,
        minimum_age: event.minimum_age,
        event_category: event.event_category,
        status: "scheduled",
        images: event.images,
        event_capacity: event.event_capacity,
        published: event.published
      },
      {
        headers: {
          authorization: `${localStorage.weexplore_token}`
        }
      }
    ).then(response => {
      console.log(response.statusText);
      if (response.statusText === "Created") {
        dispatch(eventCreated(response.data));
        localStorage.message = "Event Successfully Created"
        window.location.href = "/admin"
      }
      
    });
  };
};

export const editEvent = event => {
  return dispatch => {
    console.log("Edit Event ...");
    console.log(event);
    Axios({
      url: `${process.env.REACT_APP_BACKEND_DB_URL}/events/update`,
      method: "PATCH",
      data: event,
      headers: {
          authorization: `${localStorage.weexplore_token}`
        }
    }
    ).then(response => {
        console.log("Data from response...");
        console.log(response);
        dispatch(eventUpdated(response.data));
        
        if (response.statusText === "OK") {
          localStorage.message = "Event Edited"
          window.location.href = "/admin"
        }
    })
    .catch(err => {
      console.error("Ooops...there is a problem.");
      
      console.error(err);
    });
  };
}



const eventReducer = (state=initialState, action) => {

    let newState = {};
    switch(action.type){
        case "EVENT_CREATED":
            newState = { ...state, message: "Your event has been created." };
            break;
        case "EVENT_DELETED":
            newState = { ...state, message: "Your event has been deleted.", events: action.data };
            break;  
        case "POPULATE_EVENTS":
            newState = { ...state, events: action.data };
            break;
        case "UPDATE_EVENTS":
            newState = { ...state, events: action.data };
            break;
        case "EVENT_EDITED":
            let updated_events = state.events;
            console.log("Before data...");
            console.log(updated_events);
                        
            console.log("Returned data...")
            console.log(action.data);
            
            const index = updated_events.findIndex(event => event._id === action.data._id);
            updated_events[index] = action.data;
            newState = { ...state, events: updated_events };
            break;

        case "NEW_IMAGE":
            newState = { ...state, newImage: action.data };
            break;

        case "RESET_IMAGE":
            newState = { ...state, newImage: null };
            break;
        default:
            newState = { ...state};
            break;
    }
    return newState;
}

export default (eventReducer)
