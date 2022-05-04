import { LoggedInNavbar, LoggedOutNavbar } from "./navbar";
import 'bootstrap/dist/css/bootstrap.css';
import { getClubs } from "../services/ClubService";
import React, { useRef, useState, useEffect } from "react";
import { ErrorMessage } from "../common/ErrorMessage";
import { authHeader, getUser } from '../api/axios';
import { isEmptyObject } from "../common/helper";


export const NavbarSelect = () => {
    const [isLoading, setIsLoading] = useState(false);
    const countRef = useRef(0); // testing only = how many times this code is hit
    let navBarSelect = <LoggedOutNavbar/>; // default loggedOut unless token is available

    let user = getUser();

    if( isEmptyObject( user ) ) { return <LoggedOutNavbar/>; }

    countRef.current++;
    console.log(countRef.current)

    const {error, isLoaded, data} = getClubs()

    if (!isLoaded) {
        countRef.current++;
        console.log(countRef.current)

        if (error !== null) {
            return <ErrorMessage message="Database Unavailable"/>;
        } else {
            if (!isLoaded) return "Loading...";
            setIsLoading(true);
        }
        navBarSelect = (isLoading) ? !!data ? <LoggedInNavbar user={user}/> :
            <LoggedOutNavbar/> : "Loading...";
    }

    return (
        <div className="App">   { (isLoaded) ? navBarSelect :"Loading..."}  </div>
    )
}