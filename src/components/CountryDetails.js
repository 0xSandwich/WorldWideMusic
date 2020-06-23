import React, { useState, useEffect } from "react"
import genderColors from "../assets/GenderColors"
import productAlbums from "../assets/images/productAlbums.svg"
import closeButton from "../assets/images/close.svg"
import DecadeInput from "./DecadeInput.js";

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
  let [casseCroute, setcasseCroute] = useState([]);
  let genres = []
  let genresTest = []
  let percentage = []
  let nbrAlbumsTotal = 1
  let countryPercentage
  let nbrAlbums

  // Hook
    useEffect(() => {
        console.log('test hook')
        let query = "http://localhost:4000/getalbumworld?decade="+decade
              fetch(query)
              .then(response => response.json())
              .then((data)=> 
              {
                setcasseCroute([])
                nbrAlbumsTotal = data.total == null ? 1 : data.total
                countryPercentage = Math.round((nbrAlbums / nbrAlbumsTotal) * 100)
                for (let i = 0; i < countryPercentage; i++)
                {
                  setcasseCroute((casseCroute) => [...casseCroute, <p>*</p>])
                }
                console.log(casseCroute)
              })
              .catch(err => console.log(err));  
      }, [props.isactive])  

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
      nbrAlbums == 0 ? percentage.push(0) : percentage.push(Math.round((element / nbrAlbums) * 100))
    )

    // Sort by percent
    // percentage.sort(function(a, b){return b-a})
    // genres.sort(function(a, b){return b-a})
  }

  // console.log(data[0]);
  console.log(props.isactive)

  // Print the table of Most produced genres
  let tablePrint = colors.map((element, key) => 
  (
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
          <div className="modal-menu-item active">
            <h1>DATA</h1>
          </div>
          <div className="modal-menu-item">
            <h1>charts</h1>
          </div>
        </div>
        <img
          className="close-modal"
          onClick={props.closemodal}
          src={closeButton}
          alt="close"
        />
        <h1>
          {country} in {decade}
        </h1>
        <h3>• Number of produced albums</h3>
        <div className="product-albums-container">
            {casseCroute}
        </div>
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
    </div>
  )
}

export default CountryDetails
