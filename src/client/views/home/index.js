import React, { Component } from 'react'
import InviteWrapper from '../../ui-components/invite-code/invite-wrapper'
import Logo from '../../ui-components/logo'
import { injectGlobal } from 'styled-components'
import { getThemeCSS } from '../../utils/theme'
import './index.css'
// eslint-disable-next-line
injectGlobal`
body {
  font-family: Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  ${getThemeCSS()}
}
`

export default class App extends Component {
  render () {
    return (
      <div className='home'>
        <Logo />
        <div className='splash'>
          <InviteWrapper />
        </div>
      </div>
    )
  }
}
