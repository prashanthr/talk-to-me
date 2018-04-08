import SimplePeer from 'simple-peer'
import { signal as socketSignal } from '../socket'
// function gotMedia (stream, targetPeer, targetDOMId) {
//   var peer1 = new SimplePeer({ initiator: true, stream: stream })
//   var peer2 = targetPeer || new SimplePeer({ stream: stream })

//   peer1.on('signal', function (data) {
//     peer2.signal(data)
//   })

//   peer2.on('signal', function (data) {
//     peer1.signal(data)
//   })

//   peer2.on('stream', function (stream) {
//     // got remote video stream, now let's show it in a video tag
//     var video = document.querySelector(`#${targetDOMId}`)
//     console.log('targetDOMId', targetDOMId)
//     if (!video.src) {
//       console.log('video', video)
//       video.src = window.URL.createObjectURL(stream)
//       video.play()
//     }
//   })
// }

// export const createPeer = (opts = { initiator: true }, stream, signalCallback, streamCallback) => {
//   const peer = new SimplePeer({
//     ...opts,
//     stream: stream
//   })
//   peer.on('signal', signalCallback || (
//     (data) => {
//       console.log('signal', peer)
//     }
//   ))
//   peer.on('stream', streamCallback || (
//     (data) => {
//       console.log('peer-stream', data)
//     }
//   ))
//   return peer
// }

export const createPeer = async (opts = { initiator: false }, roomId, stream, signalCallback, streamCallback) => {
  return new Promise((resolve, reject) => {
    const peer = new SimplePeer({
      ...opts,
      stream: stream
    })
    peer.on('signal', signalCallback || (
      (data) => {
        console.log('peer-signal', peer)
        socketSignal(roomId, data)
      }
    ))
    peer.on('stream', streamCallback || (
      (data) => {
        console.log('peer-stream', data)
      }
    ))
    return resolve(peer)
  })
}

export const renderStream = (stream, targetDomId, reload = false) => {
  const videoElement = document.querySelector(targetDomId)
  if (reload || !videoElement.src) {
    videoElement.src = window.URL.createObjectURL(stream)
    videoElement.play()
  }
}

const handleStream = (stream) => {
  console.log('stream', stream)
}

// export const getMediaStream = async (opts = { video: true, audio: true }, gotMediaCallback) => {
//   try {
//     const stream = await navigator
//       .getUserMedia(opts, gotMediaCallback || handleStream, () => {})
//     console.log('getMediaStream', stream)
//     return stream
//   } catch (err) {
//     console.error('Error getting stream', err)
//   }
// }


export const getMediaStream = async (opts = { video: true, audio: true }, gotMediaCallback) => {
  return new Promise((resolve, reject) => {
    navigator
      .getUserMedia(opts, (stream) => resolve(stream), () => {})
  })
}

// export const stream = (targetPeer, targetDOMId = 'video-box') => {
//   // get video/voice stream
//   navigator.getUserMedia({ video: true, audio: true }, (stream) => gotMedia(stream, targetPeer, targetDOMId), function () {})
// }
