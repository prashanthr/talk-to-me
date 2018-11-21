import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InviteWrapper from '../../ui-components/invite-code/invite-wrapper'
import { goToUrl } from '../../utils/window'
import { isAuthValid } from '../../redux/selectors/auth'
import { connect } from 'react-redux'
import { injectGlobal } from 'styled-components'
import { getThemeCSS } from '../../utils/theme'
import analytics from '../../third-party/google/analytics'
import sentry from '../../third-party/sentry'
import './index.css'

const themeCSS = getThemeCSS()
// eslint-disable-next-line
injectGlobal`
body {
  ${themeCSS.body}
}
.sc-launcher {
  background-color: ${themeCSS.primaryColor} !important;
}
.sc-header {
  background: ${themeCSS.primaryColor} !important;
}
.sc-header--close-button:hover {
  background: ${themeCSS.primaryColor} !important;
}
`
class Home extends Component {
  componentWillMount () {
    // load third-party services
    analytics()
    sentry()
    // Check auth
    if (this.props.isAuthValid) {
      goToUrl('/welcome')
    }
  }

  render () {
    return (
      <div className='home'>
        <div className='splash'>
          <h2>Video / Audio chat made super simple.</h2> 
          <h4>Tired of using Skype? Hate call drops? Try me instead.</h4>
          <br />
          <InviteWrapper />
        </div>
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
