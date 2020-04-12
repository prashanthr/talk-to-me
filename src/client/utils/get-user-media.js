import { captureAll } from "../third-party/sentry"
import { getUserInfo } from "./window"

// Util to get user media stream
const getUserMedia = async (constraints = { video: true, audio: true }, gotMediaCallback) => {
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

export default getUserMedia
