import React, { Component } from 'react'
import PropTypes from 'prop-types'

class VideoPlayer extends Component {
  constructor (props) {
    super(props)
    this.videoRef = null
  }
  render () {
    return (
      <div>
        {this.props.showDebugInfo &&
          <span>
            {`INFO>>>`}
            {this.props.metadata}
          </span>
        }
        <video
          height={this.props.height}
          width={this.props.width}
          src={this.props.src}
          ref={el => { this.videoRef = el }}
          muted={this.props.muted}
          onClick={this.props.onClick}
          autoPlay={this.props.autoPlay}
          playsInline={this.props.playsInline}
          onLoadedMetadata={this.props.onLoadedMetadata}
        />
      </div>
    )
  }
}

VideoPlayer.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  src: PropTypes.string,
  muted: PropTypes.bool,
  playsInline: PropTypes.bool,
  autoPlay: PropTypes.bool,
  onClick: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  showDebugInfo: PropTypes.bool,
  metadata: PropTypes.any
}

VideoPlayer.defaultProps = {
  height: 480,
  width: 500,
  playsInline: true,
  autoPlay: true,
  muted: false,
  showDebugInfo: false
}

export default VideoPlayer
