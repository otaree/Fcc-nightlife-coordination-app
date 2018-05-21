import * as constants from '../actions/constants';

const initialState = {
    loading: false,
    bars: {
        businesses: [],
        id: null
    },
    location: "",
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
                bars: {
                    businesses:  action.businesses.businesses.businesses,
                    id: action.businesses.businesses._id
                }
            };
        case constants.BUSINESS_SET_LOCATION:
            return {
                ...state,
                location: action.location
            }
        case constants.BUSINESS_UNSET_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};