import React from "react"
import poster from "../assets/images/poster.svg"
import map from "../assets/images/mapcolor.svg"
// social link
import folio from "../assets/images/folio.svg"
import twitter from "../assets/images/twitter.svg"
import linkedin from "../assets/images/linkedin.svg"
import dribbble from "../assets/images/dribbble.svg"
import github from "../assets/images/github.svg"
import behance from "../assets/images/behance.svg"
import discord from "../assets/images/discord.svg"
// video
import video from "../assets/video.mp4"

function About() {
  return (
    <section className="about-container">
      <div className="about-container-bloc">
        <h1>About us</h1>
        <p>
          The production of music says a lot about the genres that are most
          appreciated from one country to another and helps to reflect the culture
          embodied by these countries. The ambition of World Wide Music is to
          allow you to visualize the concrete production of different musical
          genres in time and space to show their impact and evolution.
        </p>
        <h1 className="disclaimer">DISCLAIMER</h1>
        <p>This site has been created for educational purposes as part of the Grande Ecole curriculum of  the school HETIC. The contents and data presented have not been the subject of a request for right of use. This site will in no case be exploited for commercial purposes.</p>
      </div>
      <div className="about-container-bloc right">

        <h1>team</h1>
        {/* LUCIEN */}
        <p><span>Lucien Chotard</span> - Back/Front-end Developper</p>
        <div className="social-container">
          <a href="https://twitter.com/ChotardLucien" target="_blank"><img className="twitter" src={twitter} alt="twitter"></img></a>
          <a href="https://www.linkedin.com/in/lucien-chotard/" target="_blank"><img className="linkedin" src={linkedin} alt="linkedin"></img></a>
          <a href="https://github.com/lucienchotard" target="_blank"><img className="github" src={github} alt="github"></img></a>
          <a href="https://www.behance.net/lucienchotard" target="_blank"><img className="behance" src={behance} alt="behance"></img></a>
          <a href="https://dribbble.com/lucienchotard" target="_blank"><img className="dribbble" src={dribbble} alt="dribbble"></img></a>
          {/* <a href="" target="_blank"><img className="discord" src={discord} alt="discord"></img></a> */}
        </div>

        {/* Mathieu */}
        <p><a href="http://www.matthieuvidal.com/" target="_blank">Matthieu Vidal</a> - Back-end Developper</p>
        <div className="social-container">
          <a href="http://www.matthieuvidal.com/" target="_blank"><img className="folio" src={folio} alt="folio"></img></a>
          <a href="https://twitter.com/matthieuvdl" target="_blank"><img className="twitter" src={twitter} alt="twitter"></img></a>
          <a href="https://www.linkedin.com/in/matthieuvdl/" target="_blank"><img className="linkedin" src={linkedin} alt="linkedin"></img></a>
          <a href="https://github.com/matthieuvdl" target="_blank"><img className="github" src={github} alt="github"></img></a>
          {/* <a href="" target="_blank"><img className="behance" src={behance} alt="behance"></img></a> */}
          {/* <a href="" target="_blank"><img className="dribbble" src={dribbble} alt="dribbble"></img></a> */}
          <a href="" target="_blank"><img className="discord" src={discord} alt="discord"></img></a>
        </div>

        {/* Cathy */}
        <p><a href="https://cathydolle.com/" target="_blank">Cathy Dolle</a> - Front-end Developper | UI/UX Designer</p>
        <div className="social-container">
          <a href="https://cathydolle.com/" target="_blank"><img className="folio" src={folio} alt="folio"></img></a>
          <a href="https://twitter.com/cathydolle" target="_blank"><img className="twitter" src={twitter} alt="twitter"></img></a>
          <a href="https://www.linkedin.com/in/cathy-dolle/" target="_blank"><img className="linkedin" src={linkedin} alt="linkedin"></img></a>
          <a href="https://github.com/CathyDolle" target="_blank"><img className="github" src={github} alt="github"></img></a>
          <a href="https://www.behance.net/cathydolle" target="_blank"><img className="behance" src={behance} alt="behance"></img></a>
          <a href="https://dribbble.com/cathydolle" target="_blank"><img className="dribbble" src={dribbble} alt="dribbble"></img></a>
          <a href="https://discord.com/users/169782332247506944" target="_blank"><img className="discord" src={discord} alt="discord"></img></a>
        </div>

        {/* Anouk */}
        <p><span>Anouk Hervouet</span> - UI/UX Designer</p>
        <div className="social-container">
          {/* <a href="" target="_blank"><img className="twitter" src={twitter} alt="twitter"></img></a> */}
          <a href="https://www.linkedin.com/in/anouk-hervouet-583977186/" target="_blank"><img className="linkedin" src={linkedin} alt="linkedin"></img></a>
          {/* <a href="" target="_blank"><img className="github" src={github} alt="github"></img></a> */}
          <a href="https://www.behance.net/anoukhervouet" target="_blank"><img className="behance" src={behance} alt="behance"></img></a>
          <a href="https://dribbble.com/anouk_hervouet" target="_blank"><img className="dribbble" src={dribbble} alt="dribbble"></img></a>
          <a href="https://discord.com/users/558295665734582287" target="_blank"><img className="discord" src={discord} alt="discord"></img></a>
        </div>

        {/* Sibylle */}
        <p><span>Sibylle Hervouet</span> - UI/UX Designer</p>
        <div className="social-container">
          <a href="https://www.twitter.com/sibylle_hrvt" target="_blank"><img className="twitter" src={twitter} alt="twitter"></img></a>
          <a href="https://www.linkedin.com/in/sibylle-hervouet" target="_blank"><img className="linkedin" src={linkedin} alt="linkedin"></img></a>
          {/* <a href="" target="_blank"><img className="github" src={github} alt="github"></img></a> */}
          <a href="https://www.behance.net/sibyllehervouet" target="_blank"><img className="behance" src={behance} alt="behance"></img></a>
          <a href="https://dribbble.com/Sibsib" target="_blank"><img className="dribbble" src={dribbble} alt="dribbble"></img></a>
          <a href="" target="_blank"><img className="discord" src={discord} alt="discord"></img></a>
        </div>

        {/* Myriam */}
        <p><span>Myriam Abid Onn</span> - UI/UX Designer | Resp. Marketing</p>
        <div className="social-container">
          {/* <a href="" target="_blank"><img className="twitter" src={twitter} alt="twitter"></img></a> */}
          <a href="http://www.linkedin.com/in/myriam-abidonn" target="_blank"><img className="linkedin" src={linkedin} alt="linkedin"></img></a>
          {/* <a href="" target="_blank"><img className="github" src={github} alt="github"></img></a> */}
          <a href="https://www.behance.net/mabidonn" target="_blank"><img className="behance" src={behance} alt="behance"></img></a>
          <a href="https://dribbble.com/mabidonn" target="_blank"><img className="dribbble" src={dribbble} alt="dribbble"></img></a>
          {/* <a href="" target="_blank"><img className="discord" src={discord} alt="discord"></img></a> */}
        </div>

      </div>
      <img className="map" src={map} alt="map"></img>
      <div className="video-container">
        <h1>storytelling</h1>
        <video src={video} controls poster={poster}></video>
        <div className="wave"></div>
      </div>
    </section>
  )
}

export default About
