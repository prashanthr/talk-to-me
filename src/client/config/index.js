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
    code: 'code',
    ice: 'ice'
  },
  analytics: {
    google: {
      propertyId: ''
    }
  },
  log: {
    sentry: {
      enabled: true,
      dsn: '',
      captureUnhandledRejections: true,
      autoBreadcrumbs: true,
      tags: {
        component: 'talktome-client'
      }
    }
  },
  inviteCode: 'ilovetheinternet',
  inviteUrl: 'https://goo.gl/forms/gd3nPeuDWbhghGzY2',
  contactUrl: 'https://goo.gl/forms/NRyqULBDE4sT5EN33',
  bugUrl: 'https://github.com/prashanthr/talk-to-me/issues/new'
}

export default config
