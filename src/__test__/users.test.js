const {userLoggedOut, userEdited, userLoggedIn, userCreated} = require('../actions/user_actions');

describe('test event reducers', () => {
    it('should create an action to notify that event is deleted', () => {
        const message = "hello";
        const expectedAction = {
        type: "USER_LOGGED_OUT",
        message: message
        }
        expect(userLoggedOut(message)).toEqual(expectedAction);
    });

    it('should create an action to notify that event is deleted', () => {
        const message = "hello";
        const expectedAction = {
        type: "USER_EDITED",
        data: message
        }
        expect(userEdited(message)).toEqual(expectedAction);
    });

    it('should create an action to notify that event is deleted', () => {
        const data = {};
        const username = "something";
        const expectedAction = {
        type: "USER_LOGGED_IN",
        username: username,
        data: data
        }
        expect(userLoggedIn(username, data)).toEqual(expectedAction);
    });

    it('should create an action to notify that event is deleted', () => {
        const message = "hello";
        const expectedAction = {
        type: "USER_CREATED",
        message: message
        }
        expect(userCreated(message)).toEqual(expectedAction);
    });
});