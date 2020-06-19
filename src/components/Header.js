import React from "react"
import { NavLink } from "react-router-dom"
import logo from "../assets/images/logo.svg"

function Header() {
  return (
    <header>
      <img id="header-logo" src={logo} alt="header-logo" />
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
