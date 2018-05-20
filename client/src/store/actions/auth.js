import * as constants from './constants';

export const login = (token) => {
    localStorage.setItem("NL_token", token);
    return {
        type: constants.LOGIN,
        token
    };
};

export const logout = () => {
    localStorage.removeItem("NL_token");
    return {
        type: constants.LOGOUT
    }
};

export const authInit = () => {
    const token = localStorage.getItem("NL_token");
    console.log("token",token);
    if (token) {
        return {
            type: constants.LOGIN,
            token
        };
    }

    return {
        type: null
    };
};