import React, { useState, useEffect } from "react"
import genderColors from "../assets/GenderColors"
import { v4 as uuidv4 } from 'uuid';
import closeButton from "../assets/images/close.svg"
import spotifyButton from "../assets/images/spotify.svg"
import appleButton from "../assets/images/apple.svg"

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
  // Top Charts Info states (dirty code...)
  let [topChartsRank, setTopChartsRank] = useState([])
  let [topChartsArtist, setTopChartsArtist] = useState([])
  let [topChartsGenre, setTopChartsGenre] = useState([])
  let [topChartsAlbum, setTopChartsAlbum] = useState([])
  let [topChartsAppleMusic, setTopChartsAppleMusic] = useState([])
  let [topChartsSpotify, setTopChartsSpotify] = useState([])

  // Spotify / AppleMusic btn click handler
  let [isAppleClicked, setIsAppleClicked] = useState(false)
  let [isSpotifyClicked, setIsSpotifyClicked] = useState(false)

  // Spotify Apple Music Players
  let [spotifyPlayer, setSpotifyPlayer] = useState([])
  let [appleMusicPlayer, setAppleMusicPlayer] = useState([])

  // Selected state player
  let [selectedPlayer, setSelectedPlayer] = useState([])
  let [currentI, setCurrentI] = useState(0)
  


  let [curTab,setTab] = useState(0)
  let genres = []
  let percentage = []
  let nbrAlbums

  let handleNav = (target) =>{
    if (target === 0){
      setTab(0)
    }
    else{
      setTab(1)
    }
  }

  // Hook to Get Worldwide stats
  useEffect(() => {
    let nbrAlbumsTotal
    let countryPercentage
    let query = "https://wwmserv.herokuapp.com/getalbumworld?decade=" + decade
    fetch(query)
      .then((response) => response.json())
      .then((data) => {
        setVisuTopText('')
        setcasseCroute([])
        nbrAlbumsTotal = data.total == null ? 1 : data.total
        countryPercentage = Math.round((nbrAlbums / nbrAlbumsTotal) * 100)
        if(countryPercentage === 0)
        {
          setcasseCroute(<p className="product_text">This country only produced less than 1% needed to be printed on the graphic visualization.</p>)
        }
        else
        {
          let i = 0
          setVisuTopText(<p className="product_text">1 Block = 1%</p>)
          for (; i < countryPercentage; i++) {
            setcasseCroute((casseCroute) => [...casseCroute,<div className="fill" key={uuidv4()}></div>,])
          }
          for (; i < 100; i++) {
            setcasseCroute((casseCroute) => [
              ...casseCroute,
              <div className="empty" key={uuidv4()}></div>,
            ])
          }
        }
      })
      .catch((err) => console.log(err))
        let rank = ''
        let album = ''
        let applemusic = ''
        let spotify = ''
        let artist = ''
        let genre = ''
        let appleplay = ''
        let spotplay = ''
        query = "https://wwmserv.herokuapp.com/gettopcharts?decade=" + decade
        fetch(query)
          .then((response) => response.json())
          .then((data) => 
          {
              setTopChartsRank([])
              setTopChartsArtist([])
              setTopChartsAlbum([])
              setTopChartsAppleMusic([])
              setTopChartsSpotify([])
              setAppleMusicPlayer([])
              setSpotifyPlayer([])
              for (let j = 0; j < 5; j++) {
                rank = data.data[j].rank
                album = data.data[j].album
                artist = data.data[j].artist
                genre = data.data[j].genre
                applemusic = data.data[j].applemusic
                spotify = data.data[j].spotify
                appleplay = <iframe allow="autoplay *; encrypted-media *;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src={`https://embed.music.apple.com/us/album/${applemusic}?app=music`} height="450" width="420" background="transparent" frameBorder="0"></iframe>
                spotplay = <iframe src={`https://open.spotify.com/embed/album/${spotify}`} width="420" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                setTopChartsRank((topChartsRank) => [...topChartsRank, rank,])
                setTopChartsArtist((topChartsArtist) => [...topChartsArtist, artist,])
                setTopChartsGenre((topChartsGenre) => [...topChartsGenre, genre,])
                setTopChartsAlbum((topChartsAlbum) => [...topChartsAlbum, album,])
                setTopChartsAppleMusic((topChartsAppleMusic) => [...topChartsAppleMusic, applemusic,])
                setTopChartsSpotify((topChartsSpotify) => [...topChartsSpotify, spotify,])
                setAppleMusicPlayer((appleMusicPlayer) => [...appleMusicPlayer, appleplay,])
                setSpotifyPlayer((spotifyPlayer) => [...spotifyPlayer, spotplay,])
              }
          }
          )
          .catch((err) => console.log(err))
  }, [props.isactive, props.move])


  // // Top Charts Data GET
  // useEffect(() => {
  //   let query = "http:https://wwmserv.herokuapp.com//gettopcharts?decade=" + decade
  //   fetch(query)
  //     .then((response) => response.json())
  //     .then((data) => 
  //     {
  //         setTopChartsData(data.data[0].album)
  //     }
  //     )
  //     .catch((err) => console.log(err))
  // }, [props.isactive, props.move, decade]) // Old values : props.isactive, props.move, decade | Now only reloading at a decade change
  // //console.log(topChartsData)


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
      nbrAlbums === 0
        ? percentage.push(0)
        : percentage.push(Math.round((element / nbrAlbums) * 100))
    )

    // Sort by percent
    // percentage.sort(function(a, b){return b-a})
    // genres.sort(function(a, b){return b-a})
  }

  // console.log(topChartsAlbum)
  // console.log(topChartsSpotify)

  // Handle click on applemusic / spotify
  let playerClicAppleMusic = (i) =>
  {
    setCurrentI(i)
    if (!isAppleClicked || isSpotifyClicked)
    {
      setIsAppleClicked(true)
      setIsSpotifyClicked(false)
      setSelectedPlayer(appleMusicPlayer[i])
    }
    else
    {
      setIsAppleClicked(false)
      setSelectedPlayer([])
    }
  }
  let playerClicSpotify = (i) =>
  {
    setCurrentI(i)
    if (!isSpotifyClicked || isAppleClicked)
    {
      setIsSpotifyClicked(true)
      setIsAppleClicked(false)
      setSelectedPlayer(spotifyPlayer[i])
    }
    else
    {
      setIsSpotifyClicked(false)
      setSelectedPlayer([])
    }
  }

  // Print top charts
  let topChartsPrint = () =>
  {
    let html = []
    for (let i = 0; i < 5; i++) {
      html.push(
      <div className="topcharts" key={uuidv4()}>
        <div className="rank" key={uuidv4()}>{topChartsRank[i]}</div>
        <img className="cover" key={uuidv4()} src={`//sandbox.matthieuvidal.fr/wwmserv/img/covers/${topChartsSpotify[i]}.jpg`}></img>
        <div className ="informations_container">
          <div className="album" key={uuidv4()}>{topChartsAlbum[i]}</div>
          <div className="artist" key={uuidv4()}>{topChartsArtist[i]}</div>
          <div className="genre" key={uuidv4()}>{topChartsGenre[i]}</div>
          <div className="button_container">
            <div className="spotify-btn" onClick= {() => playerClicSpotify(i)} key={uuidv4()}><img src={spotifyButton}></img></div>
            <div className="applemusic-btn" onClick= {() => playerClicAppleMusic(i)} key={uuidv4()}><img src={appleButton}></img></div>
          </div>
        </div>
      </div>)
      i === currentI ? html.push(<div className="player">{selectedPlayer}</div>) : html.push(<div className="player"></div>)
    }
    return html
  }

  // Print the table of Most produced genres
  let tablePrint = colors.map((element, key) => (
    <tr  key={uuidv4()}>
      <th scope="row" key={uuidv4()}>
        <div
          className="modal-genre-color"
          style={{ backgroundColor: element[1] }}
        ></div>
      </th>
      <th scope="row" key={uuidv4()}>
        {genresName[key]}
      </th>
      <th scope="row" key={uuidv4()}>
        {genres[key]}
      </th>
      <th scope="row" key={uuidv4()}>
        {percentage[key]} %
      </th>
      <th scope="row" key={uuidv4()}>
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
          <div className="close-modal-container">
            <img
              className="close-modal"
              onClick={props.closemodal}
              src={closeButton}
              alt="close"
            />
          </div>
        </div>
        <div className={curTab === 1 ? "hidden" : "modal-content"}>
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
        <div className={curTab === 0 ? "hidden" : "modal-content"}>
          <h1>WORLDWIDE TOP ALBUMS</h1>
            {topChartsPrint()}
        </div>
      </div>
    </div>
  )
}

export default CountryDetails
