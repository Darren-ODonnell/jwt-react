import axios from 'axios';

// backend
const HOME = "http://192.168.100.151:8080";
const WORK = "http://147.252.81.3:8080";
const SAME_MACHINE = "http://localhost:8080";

// frontend
const WORK_LAPTOP = "http://147.252.81.42:3000"
const HOME_LAPTOP = "http://192.168.100.152:3000"

const ENDPOINT = WORK;

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


export const setAuthToken = token => {
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