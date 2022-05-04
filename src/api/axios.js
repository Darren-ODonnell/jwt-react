import axios from 'axios';

import { ENDPOINT } from "../common/globals";
import {isEmptyObject} from "../common/helper";

// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: ENDPOINT,
    timeout: 1000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});



export const getUser = () => {
    const user = JSON.parse( localStorage.getItem( 'user' ) );
    if (isEmptyObject(user)) {
        return {}
    } else {
        return user;
    }
}


export const authHeader = () => {
    // check if user exists in localstorage before checking the token
    if ( localStorage.getItem( 'user' ) !== null ) {
        const user = JSON.parse( localStorage.getItem( 'user' ) );
        if ( user && user.accessToken ) {
            return { Authorization: 'Bearer ' + user.accessToken };
        }
    }
    return {};
}

export const setAuthToken = (token) => {
    if (token) {
        //applying token
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    } else {
        //deleting the token from header
        delete instance.defaults.headers.common['Authorization'];
    }
}

const responseHandler = response => {
    switch (response.status ) {
        case 401:
            alert("Authorisation Error: User login status expired - please sign-in again");
            window.location = '/login';
            break;
        default:
            break;
    }

    return response;
};

const errorHandler = error => {    return Promise.reject(error);};

export function cancelInterceptor() {
    const cancelInterceptor = axios.interceptors.request.use(function () {/*...*/});
    instance.interceptors.request.reject(cancelInterceptor);
}
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});

instance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);





export default instance;