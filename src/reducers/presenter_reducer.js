const initialState = { 
    message: ''
}

const presenterReducer = (state=initialState, action) => {
    let newState = {};
    switch(action.type){
        case "PRESENTER_CREATED":
            newState = { ...state, message: "Your account has been created." };
            break;
        case "PRESENTER_DELETED":
            newState = { ...state, message: "You are logged in." };
            break;    
        default:
            newState = { ...state};
            break;
    }
    return newState;
}

export default presenterReducer;