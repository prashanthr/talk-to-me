import React, { Component } from 'react'
import './index.css'

export default class App extends Component {
  render () {
    console.log('here')
    return (
      <div className='App'>
        Welcome to talk
        <div className='App-header'>
          <h2>Welcome to Talk to Me</h2>
        </div>
        {/* <CreateRoom /> */}
      </div>
    )
  }
}
