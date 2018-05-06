import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InviteCode from './index'
import { connect } from 'react-redux'
import { authenticate } from '../../redux/ducks/app'

class InviteWrapper extends Component {
  render () {
    return (
      <InviteCode
        onAuthenticate={this.props.authenticate}
      />
    )
  }
}

InviteWrapper.propTypes = {
  authenticate: PropTypes.func
}

export default connect(state => ({}), { authenticate })(InviteWrapper)
