import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonGroup } from 'react-bootstrap'
import './index.css'

class VideoPlayer extends Component {
  constructor (props) {
    super(props)
    this.videoRef = null
    this.onNicknameEdit = this.onNicknameEdit.bind(this)
    this.onNicknameChange = this.onNicknameChange.bind(this)
    this.onNicknameSave = this.onNicknameSave.bind(this)
    this.state = {
      nickname: props.nickname,
      nicknameInEdit: false
    }
  }
  onNicknameEdit (event) {
    event.preventDefault()
    this.setState({
      nicknameInEdit: !this.state.nicknameInEdit
    })
  }
  onNicknameChange (event) {
    event.preventDefault()
    this.setState({
      nickname: event.target.value
    })
  }
  onNicknameSave (event) {
    event.preventDefault()
    if (event.keyCode === 13) {
      this.props.onNicknameChanged({ nickname: this.state.nickname })
      this.setState({
        nicknameInEdit: false
      })
    }
  }
  setSrcObject (srcObject) {
    this.videoRef.srcObject = srcObject
  }
  componentWillReceiveProps (nextProps) {
    if (
      this.props !== nextProps
    ) {
      if (nextProps.srcObject) {
        this.setSrcObject(nextProps.srcObject)
      }
      if (this.props.nickname !== nextProps.nickname) {
        this.setState({
          nickname: nextProps.nickname
        })
      }
    }
  }
  render () {
    const height = this.props.height ? { height: this.props.height } : {}
    const width = this.props.width ? { width: this.props.width } : { }
    let source = {}
    return (
      <div>
        <div className={this.props.disableMute ? '' : 'video-controls-overlay'}>
          {!this.props.disableMute &&
            <div className='video-controls'>
              <ButtonGroup vertical block>
                <Button onClick={this.props.onMute}>
                  {this.props.muted ? 'Unmute 🔈' : 'Mute 🔇'}
                </Button>
              </ButtonGroup>
            </div>
          }
        </div>
        <div className='video-info-overlay'>
          {this.state.nicknameInEdit
            ? (
              <input
                type={'text'}
                style={{ color: 'black' }}
                value={this.state.nickname}
                onChange={this.onNicknameChange}
                onKeyUp={this.onNicknameSave} />
              )
            : (
              <span onClick={this.onNicknameEdit}>
                {`${this.props.nickname}${this.props.mirror ? ' (You)' : ''}`}
              </span>
            )
          }
        </div>
        <video
          poster={this.props.poster}
          className={`video ${this.props.mirror ? 'video-mirror' : ''}`}
          ref={el => { this.videoRef = el }}
          muted={this.props.forceMute || this.props.muted}
          onClick={this.props.onClick}
          autoPlay={this.props.autoPlay}
          playsInline={this.props.playsInline}
          onLoadedMetadata={this.props.onLoadedMetadata}
          {...source}
          {...height}
          {...width}
        />
        <div className='video-debug'>
          {this.props.showDebugInfo &&
            <span>
              {`${JSON.stringify(this.props.metadata, null, 2)}`}
            </span>
          }
        </div>
      </div>
    )
  }
}

VideoPlayer.propTypes = {
  poster: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  src: PropTypes.string,
  srcObject: PropTypes.object,
  muted: PropTypes.bool,
  playsInline: PropTypes.bool,
  autoPlay: PropTypes.bool,
  onClick: PropTypes.func,
  onMute: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  showDebugInfo: PropTypes.bool,
  metadata: PropTypes.any,
  disableMute: PropTypes.bool,
  mirror: PropTypes.bool,
  forceMute: PropTypes.bool,
  nickname: PropTypes.string,
  onNicknameChanged: PropTypes.func
}

VideoPlayer.defaultProps = {
  height: null,
  width: null,
  playsInline: true,
  autoPlay: true,
  muted: false,
  showDebugInfo: false,
  disableMute: false,
  mirror: false
}

export default VideoPlayer
