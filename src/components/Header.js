import React from "react"
import { NavLink } from "react-router-dom"
import logo from "../assets/images/logo.svg"

function Header() {
  return (
    <header>
      <NavLink to="/home"><img id="header-logo" src={logo} alt="header-logo" /></NavLink>
      <nav>
        <ul>
          <li>
            <NavLink to="/home">home</NavLink>
            <span>|</span>
          </li>
          <li>
            <NavLink to="/map">Map</NavLink>
            <span>|</span>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
