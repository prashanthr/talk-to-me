import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { initialize } from '../../redux/ducks/room'

class Room extends Component {
  componentWillMount () {
    console.log('willMount', this.props)
    this.props.initialize()
  }

  render () {
    return (
      <div>
        Hello Room!
      </div>
    )
  }
}

Room.propTypes = {
  initialize: PropTypes.func
}

function mapStateToProps (state, ownProps) {
  return state
}

export default connect(mapStateToProps, { initialize })(Room)
