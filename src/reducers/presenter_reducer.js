import axios from 'axios';
require("dotenv").config();

const initialState = { 
    message: '',
    presenters: []
}

const presentersLoaded = (presenters) => ({
        type: "PRESENTERS_POPULATED",
        data: presenters
});

export const loadPresenters = () => {
   
    return dispatch => {
        // console.log("Loading presenter's data...");
        axios
        .get( `${ process.env.REACT_APP_BASE_URL}/presenters` )
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
        default:
            newState = { ...state};
            break;
    }
    return newState;
}

export default presenterReducer;