import React from 'react';
import Paths  from './auth/Paths';
import './App.css';
import { NavbarSelect } from "./NavBar/NavBarSelect";

const App = () =>  {
    return (

        <div>
            <NavbarSelect/>
            <Paths/>
        </div>

    )
}
export default App;