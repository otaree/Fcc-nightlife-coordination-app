import * as constants from '../actions/constants';

const initialState = {
    loading: false,
    businesses: [],
    error: null
};

export default (state=initialState, action) => {
    switch (action.type) {
        case constants.BUSINESS_LOADING:
            return {
                ...state,
                loading: true
            };
        case constants.BUSINESS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.value
            };
        case constants.BUSINESS_SET:
            return {
                ...state,
                loading: false,
                error: null,
                businesses: action.businesses.businesses
            };
        case constants.BUSINESS_UNSET_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};