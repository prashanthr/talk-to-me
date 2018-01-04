export const JOIN_ROOM = 'JOIN_ROOM'
export const JOIN_ROOM_SUCCESS = 'JOIN_ROOM_SUCCESS'
export const JOIN_ROOM_ERROR = 'JOIN_ROOM_ERROR'
export const LEAVE_ROOM = 'LEAVE_ROOM'
export const LEAVE_ROOM_SUCCESS = 'LEAVE_ROOM_SUCCESS'
export const LEAVE_ROOM_ERROR = 'LEAVE_ROOM_ERROR'
export const CREATE_ROOM = 'CREATE_ROOM'
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS'
export const CREATE_ROOM_ERROR = 'CREATE_ROOM_ERROR'

export function joinRoom () {
  return {
    type: JOIN_ROOM
  }
}

export function leaveRoom () {
  return {
    type: LEAVE_ROOM
  }
}

export function createRoom () {
  return {
    type: CREATE_ROOM
  }
}
