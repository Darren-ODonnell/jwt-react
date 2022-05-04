import React from 'react';
import Routes  from './auth/Routes';
import './App.css';
import { NavbarSelect } from "./NavBar/NavBarSelect";

const App = () =>  {
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