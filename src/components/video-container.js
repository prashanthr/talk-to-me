import React from 'react'
import './index.css'

const VideoContainer = ({
  src,
  height,
  width
}) => (
  <div className='video-container'>
    <div className='video-active'>
      <video
        id='video-box'
        className='video-box'
      />
    </div>
  </div>
)

export default VideoContainer
