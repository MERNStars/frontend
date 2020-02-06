const {presentersLoaded} = require('../actions/presenter_actions');

describe('test event reducers', () => {
    it('should create an action to notify that event is deleted', () => {
        const presenters = [{}, {}];
        const expectedAction = {
        type: "PRESENTERS_POPULATED",
        data: presenters
        }
        expect(presentersLoaded(presenters)).toEqual(expectedAction);
    });
});