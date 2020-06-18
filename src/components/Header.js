import React from 'react'
import {NavLink} from 'react-router-dom'
import logo from "../assets/images/logo.svg";

function Header() {
    return (
        <header>
            <img id="header-logo" src={logo} alt="header-logo"/>
            <nav>
                <ul>
                    <li><NavLink to="/home">Accueil</NavLink></li>
                    <li><NavLink to="/map">Map</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
