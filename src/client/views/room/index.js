import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { initialize } from '../../redux/ducks/room'

class Room extends Component {
  componentWillMount () {
    console.log('willMount', this.props)
    this.props.initialize(this.props.roomId)
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
  roomId: PropTypes.string,
  initialize: PropTypes.func
}

function mapStateToProps (state, ownProps) {
  console.log('ownProps', ownProps)
  return {
    roomId: ownProps && ownProps.match ? ownProps.match.params.id : null
  }
}

export default connect(mapStateToProps, { initialize })(Room)
