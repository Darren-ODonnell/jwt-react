import { LoggedInNavbar, LoggedOutNavbar } from "./navbar";
import 'bootstrap/dist/css/bootstrap.css';
import React, { useRef } from "react";
import { isEmptyObject } from "../common/helper";

import AuthService from "../auth/AuthService";


export const NavbarSelect = () => {
    const countRef = useRef( 0 ); // testing only = how many times this code is hit

    let user = AuthService.getUser();

    if ( isEmptyObject( user ) ) {
        return <LoggedOutNavbar/>;
    }

    // checking how often this code runs
    countRef.current++;
    console.log( countRef.current )

    return ( <div className="App">   <LoggedInNavbar user={ user }/>  </div>  )
}

