import React from 'react'

function CountryDetails(props) {
    let country = (props.data == null) ? null : props.data[0].country
    let decade = (props.data == null) ? null : props.data[0].decade
    let blues = (props.data == null) ? null : props.data[0].blues
    let classical = (props.data == null) ? null : props.data[0].classical
    let electronic = (props.data == null) ? null : props.data[0].electronic
    let folk = (props.data == null) ? null : props.data[0].folk
    let funk = (props.data == null) ? null : props.data[0].funk
    let hiphop = (props.data == null) ? null : props.data[0].hiphop
    let jazz = (props.data == null) ? null : props.data[0].jazz
    let latin = (props.data == null) ? null : props.data[0].latin
    let pop = (props.data == null) ? null : props.data[0].pop
    let reggae = (props.data == null) ? null : props.data[0].reggae
    let rock = (props.data == null) ? null : props.data[0].rock
    return (
        <div>
            <h1 style={{color:"white"}}>{country} in {decade}</h1>
        </div>
    )
}

export default CountryDetails
