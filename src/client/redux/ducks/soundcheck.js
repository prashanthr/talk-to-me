import { keyBy, find } from 'lodash'

export const INITIALIZE_SOUNDCHECK = 'INITIALIZE_SOUNDCHECK'
export const INITIALIZE_SOUNDCHECK_SUCCESS = 'INITIALIZE_SOUNDCHECK_SUCCESS'
export const INITIALIZE_SOUNDCHECK_FAILED = 'INITIALIZE_SOUNDCHECK_FAILED'

export const initializeSoundcheck = () => ({
  type: INITIALIZE_SOUNDCHECK
})

const initialState = {
  devices: {},
  defaultVideoInputId: null,
  defaultAudioOutputId: null,
  defaultAudioInputId: null
}
const findDefaultDevice = (type, devices) => {
  const device = find(devices, device => device.kind === type && device.deviceId === 'default')
  const firstDevice = find(devices, device => device.kind === type)
  return device
    ? `${device.kind}-${device.deviceId}` 
    : firstDevice
      ? `${firstDevice.kind}-${firstDevice.deviceId}` 
      : null
}
const soundcheckReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SOUNDCHECK_SUCCESS:
      return {
        ...state,
        devices: keyBy(action.devices, device => `${device.kind}-${device.deviceId}`),
        defaultAudioInputId: findDefaultDevice('audioinput', action.devices),
        defaultVideoInputId: findDefaultDevice('videoinput', action.devices),
        defaultAudioOutputId: findDefaultDevice('audiooutput', action.devices)
      }
    default:
      return state
  }
}

export default soundcheckReducer
