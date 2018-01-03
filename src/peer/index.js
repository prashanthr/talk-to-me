import Peer from 'peerjs'
import _debug from 'debug'
import config from '../../config'
import cuid from 'cuid'
import axios from 'axios'
var debug = _debug('peer')

export default class Peery {
  async init () {
    let id = cuid()
    this.peer = new Peer(id, {
      key: config.apiKey,
      host: 'localhost',
      port: 9095,
      path: '/',
      config: {}
    })
    this.id = this.peer.id
    this.disconnected = this.peer.disconnected
    this.destoryed = this.peer.destroyed
    this.connections = this.peer.getConnections

    this.peer.on('open', this.onPeerOpen)
    this.peer.on('connection', this.onPeerConnection)
    this.peer.on('call', this.onPeerCall)
    this.peer.on('error', this.onPeerError)
    this.peer.on('disconnected', this.onPeerDisconnected)
    this.peer.on('close', this.onPeerClose)
    
    // local Copy
    this.peerConnections = []

    // Register manually with server
    await axios.post('/api/peer', { id: this.id })
  }

  async connect (peerId) { 
    if (!this.peerConnections[peerId]) {
      let conn = await this.peer.connect(peerId, {
        label: 'label-peer',
        metadata: 'metadata-peer'
      })
      conn.on('data', this.onDataConnData)
      conn.on('error', this.onDataConnError)
      conn.on('open', this.onDataConnOpen)
      conn.on('close', this.onDataConnClose)
      this.peerConnections[peerId] = conn
    }
  }

  async send (peerId, data) {
    this.peerConnections[peerId].send(data)
  }

  async getMediaStream () {
    // return navigator.getUserMedia()
    let constraints = { audio: true, video: true }
    await navigator.getUserMedia(constraints)//.then(stream => {
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      /* use the stream */
      return stream
    }).catch(err => {
      console.log('Get Media Stream Error', err)
      /* handle the error */
      throw err
    })
  }

  async call (peerId) {
    debug('Calling')
    // var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
    // getUserMedia({video: true, audio: true}, stream => {
    //   var call = this.peer.call(peerId, stream)
    //   call.on('stream', remoteStream => {
    //     console.log('Remote stream ', remoteStream)
    //   })
    // }, err => {
    //   console.log('Failed to get local stream', err)
    // })

    navigator.mediaDevices.getUserMedia({video: true, audio: true}, function(stream) {
      var call = this.peer.call(peerId, stream)
      call.on('stream', function(remoteStream) {
        // Show stream in some video/canvas element.
        console.log('remote', remoteStream)
      })
    }, function(err) {
      console.log('Failed to get local stream' ,err);
    })
  }

  async disconnect (peerId) {
    await this.peer.disconnect(peerId)
    delete this.peerConnections[peerId]
  }

  async reconnect () {
    console.log('Reconnecting...')
    await this.peer.reconnect()
  }

  async destory () {
    this.peer.destroy()
  }

  // Data Connection Events
  onDataConnData (data) {
    console.log('Data Conn Data', data)
  }
  onDataConnOpen () {
    console.log('Data Conn Open')
  }
  onDataConnClose () {
    console.log('Data Conn Close')   
  }
  onDataConnError (err) {
    console.log('Data Conn Error', err)
  }
  // Peer Events
  onPeerOpen (id) {
    console.log('Connection to peer server established', id)
  }
  onPeerClose () {
    console.log('Peer closed/destroyed')
  }
  onPeerError (err) {
    console.log('Peer Error', err.type, err)
  }
  onPeerConnection (dataConnection) {
    console.log('Peer Connected', dataConnection)
  }
  onPeerDisconnected () {
    console.log('Peer Disconnected')
  }
  // answer calls
  onPeerCall (mediaConnection) {
    console.log('Peer Call', mediaConnection)
  }
}
