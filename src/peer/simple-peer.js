import SimplePeer from 'simple-peer'

function gotMedia (stream, targetPeer) {
  var peer1 = new SimplePeer({ initiator: true, stream: stream })
  var peer2 = targetPeer

  peer1.on('signal', function (data) {
    peer2.signal(data)
  })

  peer2.on('signal', function (data) {
    peer1.signal(data)
  })

  peer2.on('stream', function (stream) {
    // got remote video stream, now let's show it in a video tag
    var video = document.querySelector('#video-box')
    console.log('video', video)
    video.src = window.URL.createObjectURL(stream)
    video.play()
  })
}

export const stream = (targetPeer) => {
  // get video/voice stream
  navigator.getUserMedia({ video: true, audio: true }, (stream) => gotMedia(stream, targetPeer), function () {})
}
