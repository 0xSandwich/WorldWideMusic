import React, { Component } from 'react'
import eye from "../assets/images/eye.svg"
import eyeClose from "../assets/images/eyeclose.svg"
import globe from "../assets/images/globe.svg"
import mapIcon from "../assets/images/mapIcon.svg"

export class decadeInput extends Component {
    render() {
        return (
            <div className="date-container">
                <ul className="decade-input">
                    <li className={this.props.curdecade === 1960 ? "active" : null} onClick={()=>{this.props.handleNav(1960)}}>1960's</li>
                    <li className={this.props.curdecade === 1970 ? "active" : null} onClick={()=>{this.props.handleNav(1970)}}>1970's</li>
                    <li className={this.props.curdecade === 1980 ? "active" : null} onClick={()=>{this.props.handleNav(1980)}}>1980's</li>
                    <li className={this.props.curdecade === 1990 ? "active" : null} onClick={()=>{this.props.handleNav(1990)}}>1990's</li>
                    <li className={this.props.curdecade === 2000 ? "active" : null} onClick={()=>{this.props.handleNav(2000)}}>2000's</li>
                    <li className={this.props.curdecade === 2010 ? "active" : null} onClick={()=>{this.props.handleNav(2010)}}>2010's</li>
                    <li className={this.props.curdecade === 2020 ? "active" : null} onClick={()=>{this.props.handleNav(2020)}}>2020's</li>
                </ul>
                <div className="controls">
                    <p>Show data</p>
                    <div className="controls-item">
                        <img className={this.props.isshowall ? "active" : null} onClick={this.props.showall} src={eye} alt="view" />
                        <img className={!this.props.isshowall ? "active" : null} onClick={this.props.showall} src={eyeClose} alt="view" />
                    </div>
                    <p>Change view</p>
                    <div className="controls-item">
                        <img className={!this.props.globeview ? "active" : null} onClick={this.props.handleview} src={mapIcon} alt="view" />
                        <img className={this.props.globeview ? "active" : null} onClick={this.props.handleview} src={globe} alt="view" />
                    </div>
                </div>
            </div>
        )
    }
}

export default decadeInput
