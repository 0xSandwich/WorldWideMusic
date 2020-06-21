import React, { Component } from 'react'

export class decadeInput extends Component {
    render() {
        return (
            <div className="date-container">
            <ul className="decade-input">
                <li className={this.props.curdecade == 1960 ? "active" : null} onClick={()=>{this.props.handleNav(1960)}}>1960's</li>
                <li className={this.props.curdecade == 1970 ? "active" : null} onClick={()=>{this.props.handleNav(1970)}}>1970's</li>
                <li className={this.props.curdecade == 1980 ? "active" : null} onClick={()=>{this.props.handleNav(1980)}}>1980's</li>
                <li className={this.props.curdecade == 1990 ? "active" : null} onClick={()=>{this.props.handleNav(1990)}}>1990's</li>
                <li className={this.props.curdecade == 2000 ? "active" : null} onClick={()=>{this.props.handleNav(2000)}}>2000's</li>
                <li className={this.props.curdecade == 2010 ? "active" : null} onClick={()=>{this.props.handleNav(2010)}}>2010's</li>
                <li className={this.props.curdecade == 2020 ? "active" : null} onClick={()=>{this.props.handleNav(2020)}}>2020's</li>
                <li onClick={this.props.showall}>Voir couleurs genre</li>
            </ul>
            </div>
        )
    }
}

export default decadeInput
