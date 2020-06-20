import React from "react"
import genderColors from "../assets/GenderColors"
import productAlbums from "../assets/images/productAlbums.svg"
import closeButton from "../assets/images/close.svg"

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
  let genres = []
  let genresTest = []
  let percentage = []
  let nbrAlbums

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

    console.log(genresTest)

    // Albums number
    nbrAlbums = genres.reduce((pv, cv) => pv + cv, 0)

    // Create array and calc percentage of all styles
    genres.map((element, key) =>
      percentage.push(Math.round((element / nbrAlbums) * 100))
    )

    // Sort by percent
    // percentage.sort(function(a, b){return b-a})
    // genres.sort(function(a, b){return b-a})
  }

  // console.log(data[0]);
  console.log(nbrAlbums)

  // Print the table of Most produced genres
  let tablePrint = colors.map((element, key) => (
    <tr key={key + Math.random()}>
      <th scope="row" key={key + Math.random()}>
        <div
          className="modal-genre-color"
          style={{ backgroundColor: element[1] }}>
        </div>
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
    <>
      <div className="map-breadcrumb">
        <h1 hidden={country ? false : true} style={{ color: "white" }}>
          {country} in {decade}
        </h1>
      </div>
      <div className="country-modal">
        <img className="close-modal" src={closeButton} alt="close" />
        <h1>MOST PRODUCED GENRES</h1>
        <h3>• Number of produced albums</h3>
        <div className="product-albums-container">
          <img src={productAlbums} alt="productAlbums" />
          <img src={productAlbums} alt="productAlbums" />
        </div>
        <h3>• Most produced genres</h3>
        <table>
          <div className="line-separator"></div>
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
    </>
  )
}

export default CountryDetails
