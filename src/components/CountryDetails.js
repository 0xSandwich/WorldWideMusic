import React from 'react'
import genderColors from "../assets/GenderColors";

function CountryDetails(props) {
    let colors = Object.entries(genderColors)
    let country = (props.data == null) ? '1' : props.data[0].country
    let decade = (props.data == null) ? '1' : props.data[0].decade
    let genres = (props.data == null) ? '1' : props.data[0]

    let data = []
    if(props.data != null){
        colors.map((element,index)=>{
            data.push(
            [
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
            ])
        })
    }
    console.log(data[0]);
    

    return (
        <>
            <div className="map-breadcrumb">
                <h1 hidden={country ? false : true} style={{color:"white"}}>{country} in {decade}</h1>
            </div>
            <div className="country-modal">
                <h1>MOST PRODUCED GENRES</h1>
                <h3>Number of produced albums</h3>
                <h3>Most produced genres</h3>
                <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
                <tr>
                    <th scope="row"></th>
                    <th scope="row"></th>
                    <th scope="row"></th>
                    <th scope="row"></th>
                </tr>
            </div>
        </>
    )
}

export default CountryDetails
