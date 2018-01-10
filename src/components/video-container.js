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
    <div className='video-active-2'>
      <video
        id='video-box-2'
        className='video-box-2'
      />
    </div>
  </div>
)

export default VideoContainer
