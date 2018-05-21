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
        localStorage.setItem("location", location);
        dispatch({
            type: constants.BUSINESS_SET_LOCATION,
            location
        });
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

export const toggleGoing = (token, id, business) => {
    return async dispatch => {
        try {
            const response = await axios({ url: `http://localhost:5000/bars/business/${id}`, method: "patch" , data: { business }, headers: { 'x-auth': token } });
            console.log(response);
            dispatch({
                type: constants.BUSINESS_SET,
                businesses: response.data
            });
        } catch (e) {
            console.log("ERROR", e);
            dispatch({
                type: constants.BUSINESS_ERROR,
                value: "NETWORK ERROR"
            });
        }
    };
};

export const businessInit = () => {
    const location = localStorage.getItem("location");
    return {
        type: constants.BUSINESS_SET_LOCATION,
        location
    };
}