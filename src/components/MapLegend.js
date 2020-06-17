import React from 'react'
import genderColors from "../assets/GenderColors";

function MapLegend() {
    let values = Object.entries(genderColors)
    let listItems = values.map((element, key) =>
        <li className="map-legend-item" key={key}>
            <div className="map-legend-color" style={{backgroundColor: element[1]}}></div>
            {element[0]}
        </li>
    );
    return (
        <ul className="map-legend">
            {listItems}
        </ul>
    )
}

export default MapLegend
