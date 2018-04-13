import { call, put, select, fork, takeLatest } from 'redux-saga/effects'
import { JOIN_ROOM_SUCCESS } from '../ducks/socket'
import { PEER_ADD } from '../ducks/peer'
import { forEach } from 'lodash'
import Peer from 'simple-peer'

// Peer event handlers
const peerEventError = (err) => {
  console.error('Peer event error', err)
}

const peerEventSignal = (signal) => {
  console.info('Peer event signal', signal)
}

const peerEventConnect = () => {
  console.info('Peer connect')
}

const peerEventData = (data) => {
  console.info('Peer event data', data)
}

const peerEventStream = (stream) => {
  console.info('Peer event stream', stream)
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
      // config: { iceServers },
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
    peer.on('signal', peerEventSignal)
    peer.on('stream', peerEventStream)
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

function* setupPeers (action) {
  const { stream, socket } = yield select(state => state.user)

  const { peers, initiator } = action
  let setupPromises = []
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
