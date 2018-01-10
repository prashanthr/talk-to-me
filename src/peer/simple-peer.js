import SimplePeer from 'simple-peer'

function gotMedia (stream, targetPeer, targetDOMId) {
  var peer1 = new SimplePeer({ initiator: true, stream: stream })
  var peer2 = targetPeer || new SimplePeer({ stream: stream })

  peer1.on('signal', function (data) {
    peer2.signal(data)
  })

  peer2.on('signal', function (data) {
    peer1.signal(data)
  })

  peer2.on('stream', function (stream) {
    // got remote video stream, now let's show it in a video tag
    var video = document.querySelector(`#${targetDOMId}`)
    if (!video.src) {
      console.log('video', video)
      video.src = window.URL.createObjectURL(stream)
      video.play()
    }
  })
}

export const stream = (targetPeer, targetDOMId = 'video-box') => {
  // get video/voice stream
  navigator.getUserMedia({ video: true, audio: true }, (stream) => gotMedia(stream, targetPeer, targetDOMId), function () {})
}
