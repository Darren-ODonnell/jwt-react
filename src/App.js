import React from 'react';
// import { hot, setConfig } from 'react-hot-loader';
import Routes  from './auth/Routes';
import './App.css';
import { NavbarSelect } from "./NavBar/NavBarSelect";
import {withRouter} from "react-router-dom";

// setConfig( {    showReactDomPatchNotification: false });

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
// export default hot( module )( App );
export default App;