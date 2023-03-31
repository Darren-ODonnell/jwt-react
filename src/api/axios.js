import Axios from 'axios';

import { ENDPOINT } from "../common/globals";

// Next we make an 'instance' of it
const instance = Axios.create({
// .. where we make our configurations
    baseURL: ENDPOINT,
    timeout: 1000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'

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
    const cancelInterceptor = Axios.interceptors.request.use(function () {/*...*/});
    instance.interceptors.request.reject(cancelInterceptor);
}
// const myInterceptor = axios.interceptors.request.use(function () {/*...*/});

instance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);

export default instance;