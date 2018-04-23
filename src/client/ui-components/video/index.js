import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonGroup } from 'react-bootstrap'
import './index.css'

class VideoPlayer extends Component {
  constructor (props) {
    super(props)
    this.videoRef = null
  }
  render () {
    const height = this.props.height ? { height: this.props.height } : {}
    const width = this.props.width ? { width: this.props.width } : { }
    return (
      <div>
        {this.props.showDebugInfo &&
          <span>
            {`${JSON.stringify(this.props.metadata, null, 2)}`}
          </span>
        }
        <video
          className='video'
          src={this.props.src}
          ref={el => { this.videoRef = el }}
          muted={this.props.muted}
          onClick={this.props.onClick}
          autoPlay={this.props.autoPlay}
          playsInline={this.props.playsInline}
          onLoadedMetadata={this.props.onLoadedMetadata}
          {...height}
          {...width}
        />
        {!this.props.disableMute &&
          <div className='video-controls'>
            <ButtonGroup vertical block>
              <Button onClick={this.props.onMute}>
                Mute
              </Button>
            </ButtonGroup>
          </div>
        }
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
  onMute: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  showDebugInfo: PropTypes.bool,
  metadata: PropTypes.any,
  disableMute: PropTypes.bool
}

VideoPlayer.defaultProps = {
  height: null,
  width: null,
  playsInline: true,
  autoPlay: true,
  muted: false,
  showDebugInfo: false,
  disableMute: false
}

export default VideoPlayer
