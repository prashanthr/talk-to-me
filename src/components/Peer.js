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
     console.log('peer', this.client.peer)
     this.setState({
       id: this.client.peer.id
     })
    }

    call () {
      console.log(this.client.id + ' calling ' + this.state.destPeerId)
      this.client.call(this.state.destPeerId).then(res => console.log('hh', res))
    }

    sendData () {
      this.client.peer.sendData(this.state.destPeerId, 'hi')
    }

    onInputChanged (e) {
      console.log('e', e)
      this.setState({
        destPeerId: e.target.value
      })
    }

    render() {
        return this.state ? (<div>
            Peer
            <div id='peer'>{this.state.id}</div>
            <button type='button' onClick={this.test.bind(this)}>Register</button>
            <input type='text' name='peer-id' onChange={this.onInputChanged.bind(this)} />
            <button type='button' onClick={this.call.bind(this)}>Call</button>
            <div>
                <label>Connected Peers</label>
            </div>
        </div>) : null
    }
}