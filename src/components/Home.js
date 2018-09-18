import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Hello {this.props.user}</h1>
            </div>
        )
    }
}
