import React, { Component } from 'react'
import InviteWrapper from '../../ui-components/invite-code/invite-wrapper'
import './index.css'

export default class App extends Component {
  render () {
    return (
      <div className='home'>
        <div className='splash'>
          {'Welcome'}
          <InviteWrapper />
        </div>
      </div>
    )
  }
}
