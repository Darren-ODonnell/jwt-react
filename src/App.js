import React from 'react';
import Paths from './auth/Paths';
import './App.css';
import {NavbarSelect} from "./NavBar/NavBarSelect";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

const App = () => {
   return (
      <div>
         <DndProvider backend={HTML5Backend}>
            <NavbarSelect/>
            <Paths/>
         </DndProvider>
      </div>

   )
}
export default App;