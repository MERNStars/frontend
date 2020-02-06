// const populateEvents = require('../actions/event_actions');
const {populateEvents, deleteEvents, updateEvents, noImage, newImage, eventUpdated, eventCreated} = require('../actions/event_actions');

describe('test event reducers', () => {
  it('should create an action to populate events', () => {
    const events = [
  {
    "presenters": [
      {
        "type": "presenter",
        "avatar": "my_avatar.jpg",
        "_id": "5e37d94fa7a42f01a4f555e8",
        "first_name": "Jia",
        "last_name": "Lou",
        "title": "Dr",
        "qualification": "Surgeon",
        "long_description": "Jia is a passionate Dietitian for 15 years.",
        "contact_info": "www.facebook.com",
        "__v": 0
      },
      {
        "type": "presenter",
        "avatar": "my_avatar.jpg",
        "_id": "5e37d97aa7a42f01a4f555e9",
        "first_name": "Jimmy",
        "last_name": "Lam",
        "title": "Dr",
        "qualification": "General Practitioner",
        "long_description": "Jimmy is a passionate GP for 10 years.",
        "contact_info": "www.facebook.com",
        "__v": 0
      }
    ],
    "is_family_friendly": true,
    "minimum_age": 10,
    "event_category": "bible seminar",
    "published": true,
    "status": "postponed",
    "images": [
      "https://weexplore2020.s3-ap-southeast-2.amazonaws.com/images/902cd94d-140c-4fae-a22e-ec136a675c59.jpeg"
    ],
    "event_capacity": 30,
    "attendee_count": 4,
    "_id": "5e37cf613ae1a0869c0d7c8d",
    "event_name": "The Metal Man",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "event_date": {
      "begin": "2020-02-20T17:00:00",
      "end": "2020-02-20T19:00:00"
    },
    "registration_closed_date": "2020-01-28T00:00:00.000Z",
    "fee": [
      {
        "_id": "5e37cf613ae1a0869c0d7c8e",
        "type": "free",
        "cost": 0
      }
    ],
    "attendees": [
      {
        "friends": [
          "Test",
          "Test"
        ],
        "attended": false,
        "dependents": [
          {
            "_id": "5e38c3c32907290017423631",
            "name": "Test",
            "age": 15
          }
        ],
        "_id": "5e38c3c32907290017423630",
        "username": "christophertri90@gmail.com"
      }
    ],
    "__v": 0
  },
  {
    "presenters": [
      {
        "type": "presenter",
        "avatar": "my_avatar.jpg",
        "_id": "5e37d94fa7a42f01a4f555e8",
        "first_name": "Jia",
        "last_name": "Lou",
        "title": "Dr",
        "qualification": "Surgeon",
        "long_description": "Jia is a passionate Dietitian for 15 years.",
        "contact_info": "www.facebook.com",
        "__v": 0
      }
    ],
    "is_family_friendly": true,
    "minimum_age": 10,
    "event_category": "bible seminar",
    "published": true,
    "status": "completed",
    "images": [
      "https://weexplore2020.s3-ap-southeast-2.amazonaws.com/images/902cd94d-140c-4fae-a22e-ec136a675c59.jpeg"
    ],
    "event_capacity": 30,
    "attendee_count": 0,
    "_id": "5e37cf903ae1a0869c0d7c8f",
    "event_name": "Good God, Bad World. Why?",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "event_date": {
      "begin": "2020-02-20T17:00:00",
      "end": "2020-02-20T19:00:00"
    },
    "registration_closed_date": "2020-01-28T00:00:00.000Z",
    "fee": [
      {
        "_id": "5e37cf903ae1a0869c0d7c90",
        "type": "free",
        "cost": 0
      }
    ],
    "attendees": [],
    "__v": 0
  }];

    const expectedAction = {
      type: "POPULATE_EVENTS",
      data: events
    }
    expect(populateEvents(events)).toEqual(expectedAction);
  });

  it('should create an action to notify that event is deleted', () => {
    const events = [{}, {}];
    const expectedAction = {
      type: "EVENT_DELETED",
      data: events
    }
    expect(deleteEvents(events)).toEqual(expectedAction);
  });

  it('should create an action to notify that events are updated', () => {
    const events = [{}, {}];
    const expectedAction = {
      type: "UPDATE_EVENTS",
      data: events
    }
    expect(updateEvents(events)).toEqual(expectedAction);
  });

  it('should create an action to reset image to nothing', () => {
    const events = [{}, {}];
    const expectedAction = {
      type: "RESET_IMAGE"
    }
    expect(noImage(events)).toEqual(expectedAction);
  });  

it('should create an action to notify a new image', () => {
    const events = [{}, {}];
    const expectedAction = {
      type: "NEW_IMAGE",
      data: events
    }
    expect(newImage(events)).toEqual(expectedAction);
  }); 
  it('should create an action to trigger event being edited', () => {
    const events = [{}, {}];
    const expectedAction = {
      type: "EVENT_EDITED",
      data: events
    }
    expect(eventUpdated(events)).toEqual(expectedAction);
  }); 

  it('should create an action to trigger event being created', () => {
    const message = "Here is a message";
    const expectedAction = {
      type: "EVENT_CREATED",
      message: message
    }
    expect(eventCreated(message)).toEqual(expectedAction);
  }); 
})