import React from 'react';
import CamogieHeader from '../media/CamogieImage.png'
import './TeamsheetReport.css'

const Header = () =>{
    return (
        <header className="header">
            <img className="headerImage" src={CamogieHeader} alt="Header Image"/></header>
    );
}

export default Header;