import SimplePeer from 'simple-peer'

// get video/voice stream
navigator.getUserMedia({ video: true, audio: true }, gotMedia, function () {})

function gotMedia (stream) {
  var peer1 = new SimplePeer({ initiator: true, stream: stream })
  var peer2 = new SimplePeer()

  peer1.on('signal', function (data) {
    peer2.signal(data)
  })

  peer2.on('signal', function (data) {
    peer1.signal(data)
  })

  peer2.on('stream', function (stream) {
    // got remote video stream, now let's show it in a video tag
    var video = document.querySelector('#video')
    console.log('video', video)
    video.src = window.URL.createObjectURL(stream)
    video.play()
  })
}
