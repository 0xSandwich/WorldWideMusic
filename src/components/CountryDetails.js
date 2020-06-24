import React, { useState, useEffect } from "react"
import genderColors from "../assets/GenderColors"
import productAlbums from "../assets/images/productAlbums.svg"
import closeButton from "../assets/images/close.svg"
import DecadeInput from "./DecadeInput.js"

function CountryDetails(props) {
  let colors = Object.entries(genderColors)
  let country = props.data == null ? null : props.data[0].country
  let decade = props.data == null ? null : props.data[0].decade
  let genresName = [
    "Blues",
    "Classical",
    "Electronic",
    "Folk",
    "Funk",
    "Hip-Hop",
    "Jazz",
    "Latin",
    "Pop",
    "Reggae",
    "Rock",
  ]
  let [casseCroute, setcasseCroute] = useState([])
  let [visuTopText, setVisuTopText] = useState('')
  let [curTab,setTab] = useState(<p class="product_text"></p>)
  let genres = []
  let genresTest = []
  let percentage = []
  let nbrAlbumsTotal = 1
  let countryPercentage
  let nbrAlbums

  let handleNav = (target) =>{
    if (target === 0){
      setTab(0)
    }
    else{
      setTab(1)
    }
  }

  // Hook
  useEffect(() => {
    let query = "http://localhost:4000/getalbumworld?decade=" + decade
    fetch(query)
      .then((response) => response.json())
      .then((data) => {
        setVisuTopText('')
        setcasseCroute([])
        nbrAlbumsTotal = data.total == null ? 1 : data.total
        countryPercentage = Math.round((nbrAlbums / nbrAlbumsTotal) * 100)
        if(countryPercentage == 0)
        {
          setcasseCroute(<p class="product_text">This country only produced less than 1% needed to be printed on the graphic visualization.</p>)
        }
        else
        {
          let i = 0
          setVisuTopText(<p class="product_text">1 Block = 1%</p>)
          for (; i < countryPercentage; i++) {
            setcasseCroute((casseCroute) => [
              ...casseCroute,
              <div className="fill"></div>,
            ])
          }
          for (; i <= 100; i++) {
            setcasseCroute((casseCroute) => [
              ...casseCroute,
              <div className="empty"></div>,
            ])
          }
        }
      })
      .catch((err) => console.log(err))
  }, [props.isactive, props.move])

  if (props.data != null) {
    // Create array of genres
    genres.push(
      props.data[0].blues,
      props.data[0].classical,
      props.data[0].electronic,
      props.data[0].folk,
      props.data[0].funk,
      props.data[0].hiphop,
      props.data[0].jazz,
      props.data[0].latin,
      props.data[0].pop,
      props.data[0].reggae,
      props.data[0].rock
    )

    // Albums number
    nbrAlbums = genres.reduce((pv, cv) => pv + cv, 0)

    // Create array and calc percentage of all styles
    genres.map((element, key) =>
      // Handle NaN percentage issues
      nbrAlbums == 0
        ? percentage.push(0)
        : percentage.push(Math.round((element / nbrAlbums) * 100))
    )

    // Sort by percent
    // percentage.sort(function(a, b){return b-a})
    // genres.sort(function(a, b){return b-a})
  }

  // Print the table of Most produced genres
  let tablePrint = colors.map((element, key) => (
    <tr key={key + Math.random()}>
      <th scope="row" key={key + Math.random()}>
        <div
          className="modal-genre-color"
          style={{ backgroundColor: element[1] }}
        ></div>
      </th>
      <th scope="row" key={key + Math.random()}>
        {genresName[key]}
      </th>
      <th scope="row" key={key + Math.random()}>
        {genres[key]}
      </th>
      <th scope="row" key={key + Math.random()}>
        {percentage[key]} %
      </th>
      <th scope="row" key={key + Math.random()}>
        Albums
      </th>
    </tr>
  ))

  return (
    <div className={props.isactive ? null : "hidden"}>
      <div className="country-modal">
        <div className="modal-menu">
          <div onClick={()=>{handleNav(0)}} className={curTab === 0 ? "modal-menu-item active" : "modal-menu-item"}>
            <h1>DATA</h1>
          </div>
          <div onClick={()=>{handleNav(1)}} className={curTab === 1 ? "modal-menu-item active" : "modal-menu-item"}>
            <h1>charts</h1>
          </div>
        </div>
        <div className={curTab === 1 ? "hidden" : "null"}>
          <img
            className="close-modal"
            onClick={props.closemodal}
            src={closeButton}
            alt="close"
          />
          <h1>
            {country} in {decade}
          </h1>
          <h3>• Number of produced albums compared to the rest of the world</h3>
          {visuTopText}
          <div className="product-albums-container">{casseCroute}</div>
          <h3>• Most produced genres</h3>
          <table>
            <thead className="line-separator"></thead>
            <tbody className="genres-container">
              <tr>
                <th className="type-colors" scope="col"></th>
                <th className="music-type" scope="col"></th>
                <th className="music-value" scope="col"></th>
                <th scope="col"></th>
                <th className="albums" scope="col"></th>
              </tr>
              {tablePrint}
            </tbody>
          </table>
        </div>
        <div className={curTab === 0 ? "hidden" : "null"}>
          <h1></h1>
          <h2>Hello world^^</h2>
        </div>
      </div>
    </div>
  )
}

export default CountryDetails
