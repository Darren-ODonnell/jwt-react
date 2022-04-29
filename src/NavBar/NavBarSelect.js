import { LoggedInNavbar, LoggedOutNavbar } from "./navbar";
import 'bootstrap/dist/css/bootstrap.css';
import instance from "../api/axios";
import { getClubs } from "../services/ClubService";
import React, {useRef, useState} from "react";
import { ErrorMessage } from "../ErrorMessage";
import authHeader from "../auth/authHeader";


export const NavbarSelect = () => {
    const countRef = useRef(0); // testing only = how many times this code is hit
    let navBarSelect = <LoggedOutNavbar/>; // default loggedOut unless token is available

    let user = authHeader();

    // navBarSelect = (user2) ? <LoggedOutNavbar/> : <LoggedInNavbar/>

    if(user) {
        countRef.current++;
        console.log(countRef.current)
        // const user = JSON.parse(localStorage.getItem('user'));
        const {data, error, isLoaded} = getClubs();
        if (error !== null) {
            return <ErrorMessage message="Database Unavailable"/>;
        }
        navBarSelect = (isLoaded) ? !!data ? <LoggedInNavbar user={user}/> : <LoggedOutNavbar/> : "Loading...";
    }


    return (
        <div className="App">   { navBarSelect }   </div>
    )
}