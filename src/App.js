import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import VideoBox from './components/video-box'
import { stream } from './peer/simple-peer'
import SimplePeer from 'simple-peer'

class App extends Component {
  componentDidMount () {
    const targetPeer = new SimplePeer()
    stream(targetPeer)
  }
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <VideoBox />
      </div>
    )
  }
}

export default App
