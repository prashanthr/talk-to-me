import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import CreateRoom from './components/create-room'
// import SimplePeer from 'simple-peer'

export default class App extends Component {
  componentDidMount () {
    // const targetPeer = new SimplePeer()
    // stream(targetPeer)
  }
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <CreateRoom />
      </div>
    )
  }
}
