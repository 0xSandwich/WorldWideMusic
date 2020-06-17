import React from 'react'
import {NavLink} from 'react-router-dom'

function Header() {
    return (
        <header>
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
