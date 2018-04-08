
// Util to get user media stream
const getUserMedia = async (constraints = { video: true, audio: true }, gotMediaCallback) => {
  return new Promise((resolve, reject) => {
    try {
      navigator
      .getUserMedia(constraints, (stream) => resolve(stream), () => {})
    } catch (err) {
      console.log('Error getting media stream')
      console.error(err)
      return reject(err)
    }
  })
}

export default getUserMedia
