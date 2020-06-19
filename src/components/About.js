import React from "react"
import poster from "../assets/images/poster.svg"
import map from "../assets/images/map.svg"

function About() {
  return (
    <section className="about-container">
      <h1>About us</h1>
      <p>
        The production of music says a lot about the genres that are most
        appreciated from one country to another and helps to reflect the culture
        embodied by these countries. The ambition of World Wide Music is to
        allow you to visualize the concrete production of different musical
        genres in time and space to show their impact and evolution.
      </p>
      <h1>storytelling</h1>
      <video
        src="https://www.youtube.com/watch?v=pok8H_KF1FA"
        width="500"
        poster={poster}
        controls
      ></video>
      <img className="map" src={map} alt="map"></img>  
    </section>
  )
}

export default About
