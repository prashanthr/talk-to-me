import stunServers from './stun'
const config = {
  iceServers: stunServers.map(url => ({ urls: url })),
  localStorage: {
    gumConstraints: 'gum',
    auth: 'auth',
    code: 'code'
  }
}

export default config
