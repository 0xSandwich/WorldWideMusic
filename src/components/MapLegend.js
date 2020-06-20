import React from 'react'
import genderColors from "../assets/GenderColors";

function MapLegend(props) {
    let colors = Object.entries(genderColors)
    let gender = null
    let data = colors
    if(props.data != null){
        data = []
        gender = props.data[0]
        console.log(props.data[0])
        colors.map((element,index)=>{
            data.push([
                element[0],
                element[1],
                gender[element[0]]  
            ])
            return null
        })
    }
    let listItems = data.map((element, key) =>
        <li className="map-legend-item" key={key}>
            <div className="map-legend-color" style={{backgroundColor: element[1]}}></div>
            {element[0]} {(element.length>2 && props.showData) ? ": "+element[2] : null} 
        </li>
    );
    return (
        <>
            <div className={props.legendClass}>
                <ul className="map-legend">
                    {listItems}
                </ul>
            </div>

        </>
    )
}

export default MapLegend
