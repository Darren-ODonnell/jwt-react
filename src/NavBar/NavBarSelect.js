import { LoggedInNavbar, LoggedOutNavbar } from "./navbar";
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import {isEmptyObject} from "../common/helper";

import AuthService from "../auth/AuthService";


export const NavbarSelect = () => {
   let user = AuthService.getUser();

   if ( isEmptyObject( user ) ) {
      return <LoggedOutNavbar/>;
   }


   return ( <div className="App"><LoggedInNavbar user={ user }/></div> )
}

