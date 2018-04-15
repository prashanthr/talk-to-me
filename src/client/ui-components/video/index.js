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
        src={this.props.src}
        ref={el => { this.videoRef = el }}
        muted={this.props.muted}
        onClick={this.props.onClick}
        autoPlay={this.props.autoPlay}
        playsInline={this.props.playsInline}
        onLoadedMetadata={this.props.onLoadedMetadata}
      />
    )
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string,
  muted: PropTypes.bool,
  playsInline: PropTypes.bool,
  autoPlay: PropTypes.bool,
  onClick: PropTypes.func,
  onLoadedMetadata: PropTypes.func
}

VideoPlayer.defaultProps = {
  playsInline: true,
  autoPlay: true,
  muted: false
}

export default VideoPlayer
