import React from 'react';
import Paths  from './auth/Paths';
import './App.css';
import { NavbarSelect } from "./NavBar/NavBarSelect";

const App = () =>  {
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