import React from 'react';
import Routes  from './auth/Routes';
import './App.css';
import { NavbarSelect } from "./NavBar/NavBarSelect";

const App = () =>  {
    // enable for a single run of app if debugger no longer stops at breakpionts
    // window.location.reload(true);
    return (
        // <React.StrictMode>
            <div>
                <NavbarSelect/>
                <Routes/>
            </div>
        // </React.StrictMode>
    )
}
export default App;