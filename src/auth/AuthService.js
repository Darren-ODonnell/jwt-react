import React from "react";
import instance from "../api/axios";
import { isEmptyObject } from "../common/helper";

const API_URL = "http://localhost:8080/api/auth/";

// auth user related

export const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (isEmptyObject(user)) ? {} : user;
};
const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (isEmptyObject(user)) ? {} : user;
}
const saveCurrentUser = (user) => { localStorage.setItem("user", JSON.stringify(user)); }

const setAuthToken = (token) => {
    if (token) {
        //applying token
        instance.defaults.headers.common['Authorization'] = "Bearer " + token;
    } else {
        // deleting the token from header
        delete instance.defaults.headers.common['Authorization'];
    }
}
const createHeader = (token) => {  return { headers: { Authorization: "Bearer " + token, } }}
const getAuthToken = () =>      {  return localStorage.getItem( 'token' );}
const saveHeader = (header) =>  {  localStorage.setItem( 'headers', JSON.stringify( header ) );}
const authHeader = () => {
    // check if user exists in localstorage before checking the token
    if ( getUser() !== null ) {
        const user = getUser();
        if ( user && user.accessToken ) {
            return { Authorization: 'Bearer ' + user.accessToken };
        }
    }
    return {};
}

// menu actions related to authentication

const Login = (username, password) => {
    return instance
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                saveCurrentUser(response.data)
            }
            return response.data;
        });
};

const Register = (username, email, password) => {
    return instance.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};
const Logout = () => {
    localStorage.removeItem("user");
    window.location = "/";
};


const AuthService = {
    // auth menu actions
    Register,
    Login,
    Logout,
    // utility auth methods
    getCurrentUser,
    getUser,
    authHeader,
    setAuthToken,
    getAuthToken,
    saveCurrentUser,
    saveHeader,
    createHeader,
};
export default AuthService;
