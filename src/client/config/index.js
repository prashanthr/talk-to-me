import { primaryStunServers, secondaryStunServers, ternaryStunServers, buildStunServers } from './stun'
const config = {
  stunServers: {
    primary: buildStunServers(primaryStunServers),
    secondary: buildStunServers(secondaryStunServers),
    ternary: buildStunServers(ternaryStunServers)
  },
  localStorage: {
    gumConstraints: 'gum',
    auth: 'auth',
    code: 'code'
  }
}

export default config
