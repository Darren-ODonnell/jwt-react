import React from 'react';
import Paths  from './auth/Paths';
import './App.css';
import { NavbarSelect } from "./NavBar/NavBarSelect";



const App = () =>  {
    // enable for a single run of app if debugger no longer stops at breakpionts
    // window.location.reload(true);
    return (
        <React.StrictMode>
            <div>
                <NavbarSelect/>
                <Paths/>
            </div>
        </React.StrictMode>
    )
}
export default App;