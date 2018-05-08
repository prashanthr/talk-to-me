import { filter } from 'lodash'

// Util to get user media stream
export const getUserMedia = async (constraints = { video: true, audio: true }, gotMediaCallback) => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      return await navigator.mediaDevices.getUserMedia(constraints)
    } catch (err) {
      console.log('Error getting media stream via mediaDevices')
      console.error(err)
      throw err
    }
  }
  return new Promise((resolve, reject) => {
    try {
      const gum = navigator.getUserMedia || navigator.webkitGetUserMedia
      if (!gum) {
        return reject(new Error('This browser does not support WebRTC 😞'))
      }
      gum(constraints, (stream) => resolve(stream), () => {})
    } catch (err) {
      console.log('Error getting media stream via legacy getUserMedia')
      console.error(err)
      return reject(err)
    }
  })
}

export const getDevices = async (types = []) => {
  try {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      const allDevices = await navigator.mediaDevices.enumerateDevices()
      if (!types || types.length === 0) return allDevices
      return filter(allDevices, device => types.includes(device.kind))
    } else {
      console.warn('Devices api not supported')
      return []
    }
  } catch (err) {
    console.log('Error getting devices')
    console.error(err)
    return []
  }
}
