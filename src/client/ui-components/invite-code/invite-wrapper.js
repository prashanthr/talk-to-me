import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InviteCode from './index'
import { connect } from 'react-redux'
import { authenticate } from '../../redux/ducks/session'

class InviteWrapper extends Component {
  render () {
    return (
      <InviteCode
        code={this.props.code}
        error={this.props.error}
        onAuthenticate={this.props.authenticate}
      />
    )
  }
}

InviteWrapper.propTypes = {
  authenticate: PropTypes.func,
  code: PropTypes.string,
  error: PropTypes.string
}

function mapStateToProps (state) {
  return {
    code: state.session.invite.code,
    error: state.session.invite.error
  }
}

export default connect(mapStateToProps, { authenticate })(InviteWrapper)
