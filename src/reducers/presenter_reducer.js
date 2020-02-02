import axios from 'axios';
require("dotenv").config();

const initialState = { 
    message: '',
    presenters: [],
    selectedPresenters: null
}

const presentersLoaded = (presenters) => ({
        type: "PRESENTERS_POPULATED",
        data: presenters
});


export const loadPresenters = () => {
   
    return dispatch => {
        // console.log("Loading presenter's data...");
        axios
        .get( `${ process.env.REACT_APP_BACKEND_DB_URL}/presenters` )
        .then(result => {
            const data = result.data;
            // console.log("Presenters loaded..." + data.length);
            dispatch(presentersLoaded(data));
        })
        .catch(error => {
            console.log(`ERROR: ${error}`);
        });
    }
}




export const populatePresenters = (presenters) => {
    return {
        type: "POPULATE_PRESENTERS",
        data: presenters
    }
}


export const selectPresenters = (presenters) => {
    return {
        type: "SELECT_PRESENTERS",
        data: presenters
    }
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
        case "PRESENTERS_POPULATED":
            newState = { ...state, presenters: action.data };
            break;
        case "POPULATE_PRESENTERS":
            newState = {...state, presenters: action.data};
            break;
        case "SELECT_PRESENTERS":
            console.log(action.data)
            newState = {...state, selectedPresenters: action.data};
            break;
        default:
            newState = { ...state};
            break;
    }
    return newState;
}

export default presenterReducer;