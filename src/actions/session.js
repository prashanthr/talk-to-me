export const JOIN_ROOM = 'JOIN_ROOM'
export const JOIN_ROOM_SUCCESS = 'JOIN_ROOM_SUCCESS'
export const JOIN_ROOM_ERROR = 'JOIN_ROOM_ERROR'
export const LEAVE_ROOM = 'LEAVE_ROOM'
export const LEAVE_ROOM_SUCCESS = 'LEAVE_ROOM_SUCCESS'
export const LEAVE_ROOM_ERROR = 'LEAVE_ROOM_ERROR'
export const CREATE_ROOM = 'CREATE_ROOM'
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS'
export const CREATE_ROOM_ERROR = 'CREATE_ROOM_ERROR'
export const LOAD_ROOM = 'LOAD_ROOM'
export const LOAD_ROOM_SUCCESS = 'LOAD_ROOM_SUCCESS'
export const LOAD_ROOM_ERROR = 'LOAD_ROOM_ERROR'
export const FIND_PEERS = 'FIND_PEERS'
export const FIND_PEERS_SUCCESS = 'FIND_PEERS_SUCCESS'
export const FIND_PEERS_ERROR = 'FIND_PEERS_ERROR'

export function findPeers (roomId, clientId) {
  return {
    type: FIND_PEERS,
    roomId,
    clientId
  }
}

export function loadRoom (id) {
  return {
    type: LOAD_ROOM,
    id
  }
}

export function joinRoom (name, roomId) {
  return {
    type: JOIN_ROOM,
    roomId,
    name
  }
}

export function leaveRoom (id) {
  return {
    type: LEAVE_ROOM,
    id
  }
}

export function createRoom (name) {
  return {
    type: CREATE_ROOM,
    name
  }
}
