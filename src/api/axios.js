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