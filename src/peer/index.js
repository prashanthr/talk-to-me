import Peer from 'peerjs'
import _debug from 'debug'
import config from '../../config'
// import  cuid from 'cuid'
var debug = _debug('peer')

export default class Peery {
    constructor () {
      this.peer = new Peer('123', {
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
      }
    }

    async disconnect (peerId) {
      await this.peer.disconnect(peerId)
      delete this.peerConnections[peerId]
    }

    async reconnect () {
      debug('Reconnecting...')
      await this.peer.reconnect()
    }

    async destory () {
      this.peer.destroy()
    }

    // Data Connection Events
    onDataConnData (data) {
      debug('Data Conn Data', data)
    }
    onDataConnOpen () {
      debug('Data Conn Open')
    }
    onDataConnClose () {
      debug('Data Conn Close')   
    }
    onDataConnError (err) {
      debug('Data Conn Error', err)
    }
    // Peer Events
    onPeerOpen (id) {
      debug('Connection to peer server established', id)
    }
    onPeerClose () {
      debug('Peer closed/destroyed')
    }
    onPeerError (err) {
      debug('Peer Error', err.type, err)
    }
    onPeerConnection (dataConnection) {
      debug('Peer Connected', dataConnection)
    }
    onPeerDisconnected () {
      debug('Peer Disconnected')
    }
    onPeerCall (mediaConnection) {
      debug('Peer Call', mediaConnection)
    }
}