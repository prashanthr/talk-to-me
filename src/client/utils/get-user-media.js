
// Util to get user media stream
const getUserMedia = async (constraints = { video: true, audio: true }, gotMediaCallback) => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      console.info('gum-new')
      return await navigator.mediaDevices.getUserMedia(constraints)
    } catch (err) {
      console.log('Error getting media stream')
      console.error(err)
    }
  }
  return new Promise((resolve, reject) => {
    try {
      const gum = navigator.getUserMedia || navigator.webkitGetUserMedia
      if (!gum) {
        return reject(new Error('Browser unsupported'))
      }
      console.info('gum-old')
      gum(constraints, (stream) => resolve(stream), () => {})
    } catch (err) {
      console.log('Error getting media stream')
      console.error(err)
      return reject(err)
    }
  })
}

export default getUserMedia
