import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import CreateRoom from './components/create-room'

export default class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Welcome to Talk to Me</h2>
        </div>
        {/* <CreateRoom /> */}
      </div>
    )
  }
}
