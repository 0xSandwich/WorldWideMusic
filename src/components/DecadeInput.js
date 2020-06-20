import React, { Component } from 'react'

export class decadeInput extends Component {
    render() {
        return (
            <div className="decade-input">
                <button onClick={()=>{this.props.handleNav(1960)}}>1960</button>
                <button onClick={()=>{this.props.handleNav(1970)}}>1970</button>
                <button onClick={()=>{this.props.handleNav(1980)}}>1980</button>
                <button onClick={()=>{this.props.handleNav(1990)}}>1990</button>
                <button onClick={()=>{this.props.handleNav(2000)}}>2000</button>
                <button onClick={()=>{this.props.handleNav(2010)}}>2010</button>
                <button onClick={this.props.nextdecade}>Next</button>
                <button onClick={this.props.showall}>ShowAll</button>
            </div>
        )
    }
}

export default decadeInput
