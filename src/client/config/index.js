import stunServers from './stun'
const config = {
  iceServers: stunServers.map(url => ({ urls: url }))
}

export default config
