import React, { Component } from 'react'

export class decadeInput extends Component {
    render() {
        return (
            <div className="decade-input">
                <button onClick={()=>{this.props.handleNav(1960)}}>1960</button>
                <button onClick={()=>{this.props.handleNav(1970)}}>1970</button>
            </div>
        )
    }
}

export default decadeInput
