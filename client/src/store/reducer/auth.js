import * as constants from '../actions/constants';

const initialState = {
    token: null
};

export default (state=initialState, action) => {
    switch (action.type) {
        case constants.LOGIN:
            return {
                ...state,
                token: action.token
            };
        case constants.LOGOUT:
            return {
                ...state,
                token: null
            }
        default:
            return state;
    }
}