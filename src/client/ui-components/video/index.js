import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class VideoPlayer extends Component {
  constructor (props) {
    super(props)
    this.videoRef = null
  }
  render () {
    return (
      <video
        ref={el => { this.videoRef = el }}
      />
    )
  }
}

VideoPlayer.propTypes = {

}

function mapStateToProps (state, ownProps) {
  return state
}

export default connect(mapStateToProps, {})(VideoPlayer)
