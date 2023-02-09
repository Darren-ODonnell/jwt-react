import React from 'react';
import CamogieHeader from '../media/CamogieImage.png'
import './Report.css'

function Header() {
    return (
        <header className="header">
            <img className="headerImage" src={CamogieHeader} alt="Header Image"/></header>
    );
}

export default Header;