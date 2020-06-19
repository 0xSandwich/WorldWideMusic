import React from "react"
// import poster from "../assets/images/poster.svg"
import map from "../assets/images/map.svg"
import video from "../assets/video.mp4"

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
      <video src={video} width="500" controls></video>
      <img className="map" src={map} alt="map"></img>
    </section>
  )
}

export default About
