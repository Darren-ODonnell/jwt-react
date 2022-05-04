import axios from "axios";
import { CLUB_LIST } from "../common/globals";
import { AgGridReact } from "ag-grid-react";
import React from "react";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};



export const checkToken = () => {

    return axios.get(CLUB_LIST)
            // .then(() => { return true  })
            //  (() => { return false })

}

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const Authservice = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default Authservice;
