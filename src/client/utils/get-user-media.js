
// Util to get user media stream
const getUserMedia = async (constraints = { video: true, audio: true }, gotMediaCallback) => {
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

export default getUserMedia
