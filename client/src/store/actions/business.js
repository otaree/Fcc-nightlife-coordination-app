import axios from 'axios';

import * as constants from './constants';



export const loading = _ => {
    return { type: constants.BUSINESS_LOADING };
};

export const unsetError = _ => {
    return { type: constants.BUSINESS_UNSET_ERROR };
};

export const fetchBusiness = location => {
    return async dispatch => {
        dispatch(loading());

        try {
            const response = await axios.get(`http://localhost:5000/bars/${location}`);
            dispatch({
                type: constants.BUSINESS_SET,
                businesses: response.data
            });
        } catch (e) {
            dispatch({
                type: constants.BUSINESS_ERROR,
                value: "NETWORK ERROR"
            });
        }
    }
};