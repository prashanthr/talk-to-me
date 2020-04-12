import { filter } from 'lodash'
import { captureAll } from '../third-party/sentry'
import { getUserInfo } from './window'

// Util to get user media stream
export const getUserMedia = async (constraints = { video: true, audio: true }, gotMediaCallback) => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      return await navigator.mediaDevices.getUserMedia(constraints)
    } catch (error) {
      const errorMsg = 'Error getting media stream via mediaDevices'
      console.log(errorMsg)
      console.error(error)
      captureAll({
        message: errorMsg,
        breadcrumb: getUserInfo(),
        error
      })
      throw error
    }
  }
  return new Promise((resolve, reject) => {
    try {
      const gum = navigator.getUserMedia || navigator.webkitGetUserMedia
      if (!gum) {
        return reject(new Error('This browser does not support WebRTC 😞'))
      }
      gum(constraints, (stream) => resolve(stream), () => {})
    } catch (error) {
      const errorMsg = 'Error getting media stream via legacy getUserMedia'
      console.log(errorMsg)
      console.error(error)
      captureAll({
        message: errorMsg,
        breadcrumb: getUserInfo(),
        error
      })
      return reject(error)
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
      const warnMsg = 'Devices api not supported'
      captureAll({
        message: warnMsg,
        breadcrumb: getUserInfo()
      })
      return []
    }
  } catch (error) {
    const errorMsg = 'Error getting devices'
    console.log(errorMsg)
    console.error(error)
    captureAll({
      message: errorMsg,
      breadcrumb: getUserInfo(),
      error
    })
    return []
  }
}
