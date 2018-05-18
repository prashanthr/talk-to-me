import { put, select, fork, takeLatest } from 'redux-saga/effects'
import { JOIN_ROOM_SUCCESS } from '../ducks/socket'
import { PEER_ADD, PEER_REMOVE } from '../ducks/peer'
import { forEach, filter, keys } from 'lodash'
import Peer from 'simple-peer'
import { store } from '../../index'
import config from '../../config'
import { setLocalStorage, getLocalStorage, getUserInfo } from '../../utils/window'
import { captureBreadcrumb, captureException } from '../../third-party/sentry'

// Peer event handlers
const peerEventError = (err) => {
  console.error('Peer event error', err.code, err)
  captureBreadcrumb(getUserInfo())
  captureException(err)
  if (err.code === 'ERR_ICE_CONNECTION_FAILURE' ||
      (err.message &&
        (
          err.message === 'Ice connection failed' ||
          err.message.toLowerCase().includes('ice')
        )
      )
    ) {
    const currentIce = getLocalStorage(config.localStorage.ice)
    setLocalStorage(config.localStorage.ice, {
      code: err.code,
      error: err,
      stunServerKey: currentIce.stunServerKey
    })
  }
}

const peerEventSignal = ({
  peerId,
  signal,
  socket
}) => {
  socket.emit('signal', { signal, peerId })
}

const peerEventConnect = () => {
  console.info('Peer connect')
}

const peerEventData = (data) => {
  console.info('Peer event data', data)
}

const peerEventStream = ({ peerId, socket, stream }) => {
  // socket.emit('stream', { stream, peerId })
  return store.dispatch({
    type: 'SOCKET_STREAM',
    stream: stream,
    peerId
  })
}

const peerEventClose = (peerId) => {
  console.info('Peer event close')
  return store.dispatch({
    type: PEER_REMOVE,
    peerId
  })
}

const createPeer = ({
  peerId,
  stream,
  socket,
  initiator
}) => {
  return new Promise((resolve, reject) => {
    const isInitiator = socket.id === initiator
    const stunServerKeys = ['primary', 'secondary', 'ternary']
    const localIce = getLocalStorage(config.localStorage.ice)
    let iceServers
    if (localIce && localIce.error && localIce.stunServerKey) {
      console.info('encountered error with ice server previously')
      const currentIndex = stunServerKeys.indexOf(localIce.stunServerKey)
      if (currentIndex && currentIndex < stunServerKeys.length - 1) {
        const newIceKey = stunServerKeys[currentIndex] + 1
        console.info(`using ${newIceKey} stun`)
        iceServers = config.stunServers[newIceKey]
      }
    } else {
      console.info('using primary stun')
      setLocalStorage(config.localStorage.ice, { stunServerKey: 'primary' })
      iceServers = config.stunServers.primary
    }
    const peer = new Peer({
      initiator: isInitiator,
      config: {
        iceServers
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
    peer.once('close', () => peerEventClose(peerId))
    peer.on('signal', signal => peerEventSignal({ signal, socket, peerId }))
    peer.on('stream', stream => peerEventStream({ stream, socket, peerId }))
    peer.on('data', peerEventData)
    return resolve({
      channel: peer,
      peerId
    })
  })
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
  const state = yield select(state => state)
  const { stream, socket } = state.user
  const existingPeers = state.peer

  const { peers, initiator } = action
  const filteredPeers = filter(peers, peerId => !existingPeers[peerId] && peerId !== socket.id)

  let setupPromises = []

  forEach(filteredPeers, peerId => {
    setupPromises.push(createPeer({
      peerId,
      initiator,
      socket,
      stream
    }))
  })
  const peerChannels = yield Promise.all(setupPromises)
  for (const peerChannel of peerChannels) {
    yield addPeer(peerChannel)
  }

  // Destroy any old peers
  const peersToDestroy = keys(existingPeers).filter(key => !peers.includes(key))
  for (const key of peersToDestroy) {
    const peerToDestroy = existingPeers[key]
    if (peerToDestroy && peerToDestroy.channel) {
      peerToDestroy.channel.destroy()
      yield removePeer(key)
    }
  }
}

function* setupPeersFlow () {
  yield takeLatest(JOIN_ROOM_SUCCESS, setupPeers)
}

export default [
  fork(setupPeersFlow)
]
