import React from "react"
import map from "../assets/images/map.svg"
import { Link } from "react-router-dom"

function Home() {
  return (
    <section className="home-container">
      <h1>Welcome to worldwide music</h1>
      <p>
        World Wide Music is here to allow you to visualize the concrete
        production of different musical genres in time and space to show their
        impact and evolution trough our interactive map ! Let yourself be
        immersed in the magical world of music.
      </p>

      <Link to="/map">
        <div className="start-button">start</div>
      </Link>
      <img className="map" src={map} alt="map"></img>  
      <div className="wave"></div>
    </section>
  )
}

export default Home
