import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InviteWrapper from '../../ui-components/invite-code/invite-wrapper'
import { goToUrl } from '../../utils/window'
import { isAuthValid } from '../../redux/selectors/auth'
import { connect } from 'react-redux'
import Logo from '../../ui-components/logo'
import { injectGlobal } from 'styled-components'
import { getThemeCSS } from '../../utils/theme'
import analytics from '../../third-party/google/analytics'
import sentry from '../../third-party/sentry'
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
const APP_VERSION = process.env.APP_VERSION
class Home extends Component {
  componentWillMount () {
    // load third-party services
    analytics()
    sentry()
    if (this.props.isAuthValid) {
      goToUrl('/welcome')
    }
  }

  render () {
    return (
      <div className='home'>
        <Logo />
        <div className='splash'>
          <InviteWrapper />
        </div>
        <footer className='footer'>
          Copyright © PR. {`${new Date().getFullYear()}`}
          {`${APP_VERSION ? `v${APP_VERSION}` : ''}`}
        </footer>
      </div>
    )
  }
}

Home.propTypes = {
  isAuthValid: PropTypes.bool
}

function mapStateToProps (state) {
  return ({
    isAuthValid: isAuthValid(state) || false
  })
}

export default connect(mapStateToProps, {})(Home)
