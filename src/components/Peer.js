import React, { Component } from 'react'
import Peer from '../peer'

export default class PeerBox extends Component {
    constructor() {
      super()
      this.client = new Peer()
    }

    test () {
     console.log(this.client.peer)
    }

    render() {
        return (<div>
            Peer
            <div id='peer'>{this.client.peer.id}</div>
            <button name='test' onClick={this.test.bind(this)} />
        </div>)
    }
}