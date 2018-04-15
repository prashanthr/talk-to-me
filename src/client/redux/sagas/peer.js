import { call, put, select, fork, takeLatest } from 'redux-saga/effects'
import { JOIN_ROOM_SUCCESS } from '../ducks/socket'
import { PEER_ADD, PEER_REMOVE } from '../ducks/peer'
import { forEach } from 'lodash'
import Peer from 'simple-peer'
import { store } from '../../index'

// Peer event handlers
const peerEventError = (err) => {
  console.error('Peer event error', err)
}

const peerEventSignal = ({
  peerId,
  signal,
  socket
}) => {
  console.info('Peer event signal', signal)
  socket.emit('signal', { signal, peerId })
}

const peerEventConnect = () => {
  console.info('Peer connect')
}

const peerEventData = (data) => {
  console.info('Peer event data', data)
}

const peerEventStream = ({ peerId, socket, stream }) => {
  console.info('Peer event stream', stream)
  // socket.emit('stream', { stream, peerId })
  return store.dispatch({
    type: 'SOCKET_STREAM',
    stream: stream,
    peerId
  })
}

const peerEventClose = () => {
  console.info('Peer event close')
}

const createPeer = ({
  peerId,
  stream,
  socket,
  initiator
}) => {
  return new Promise((resolve, reject) => {
    const peer = new Peer({
      initiator: socket.id === initiator,
      config: {
        iceServers: [{
          url: 'stun:stun.l.google.com:19302',
          urls: 'stun:stun.l.google.com:19302'
        }]
      },
      // Allow the peer to receive video, even if it's not sending stream:
      // https://github.com/feross/simple-peer/issues/95
      offerConstraints: {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      },
      stream
    })
    peer.once('error', peerEventError)
    peer.once('connect', peerEventConnect)
    peer.once('close', peerEventClose)
    peer.on('signal', signal => peerEventSignal({ signal, socket, peerId }))
    peer.on('stream', stream => peerEventStream({ stream, socket, peerId }))
    peer.on('data', peerEventData)
    return resolve({
      channel: peer,
      peerId
    })
  })
}

const destroyPeer = () => {

}

// state
function* addPeer ({ channel, peerId }) {
  yield put({
    type: PEER_ADD,
    channel,
    peerId
  })
}

function* removePeer (peerId) {
  yield put({
    type: PEER_REMOVE,
    peerId
  })
}

function* setupPeers (action) {
  const { stream, socket } = yield select(state => state.user)

  const { peers, initiator } = action
  let setupPromises = []
  for (const pr of peers) {
    yield removePeer(pr)
  }
  forEach(peers, peerId => {
    setupPromises.push(createPeer({
      peerId,
      initiator,
      socket,
      stream
    }))
  })
  const peerChannels = yield Promise.all(setupPromises)
  console.log('done', peerChannels)
  for (const peerChannel of peerChannels) {
    yield addPeer(peerChannel)
  }
}

function* setupPeersFlow () {
  yield takeLatest(JOIN_ROOM_SUCCESS, setupPeers)
}

export default [
  fork(setupPeersFlow)
]
