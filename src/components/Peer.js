import React, { Component } from 'react'
import Peer from '../peer'

export default class PeerBox extends Component {
    constructor() {
      super()
      this.client = new Peer()
    }

    componentWillMount() {
      this.setState({
        id: null
      })
    }

    init () {
      this.client.init()
    }

    test () {
     this.init()
     console.log(this.client.peer)
     this.setState({
       id: this.client.peer.id
     })
    }

    render() {
        return this.state ? (<div>
            Peer
            <div id='peer'>{this.state.id}</div>
            <button type='button' onClick={this.test.bind(this)}>Register</button>
            <div>
                <label>Connected Peers</label>
            </div>
        </div>) : null
    }
}