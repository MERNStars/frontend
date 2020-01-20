const initialState = { 
    event_categories: ["bible seminar", "career seminar", "exercise class", "health seminar", "healthy cooking", "lifestyle change workshop", "mental health workshop", "massage service", "others", "addiction recovery", "weight-loss program"],
    
    event_statuses: ["scheduled", "canceled", "postponed", "completed", "sold out"],

    message: ''
}


const eventReducer = (state=initialState, action) => {
    let newState = {};
    switch(action.type){
        case "EVENT_CREATED":
            newState = { ...state, message: "Your event has been created." };
            break;
        case "EVENT_DELETED":
            newState = { ...state, message: "Your event has been deleted." };
            break;    
        default:
            newState = { ...state};
            break;
    }
    return newState;
}

export default eventReducer;