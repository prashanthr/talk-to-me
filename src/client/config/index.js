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
      propertyId: 'UA-117106220-2'
    }
  },
  log: {
    sentry: {
      enabled: true,
      dsn: 'https://e49bb58cac3e47a6b80f1619d8a20391@sentry.io/1205381',
      captureUnhandledRejections: true,
      autoBreadcrumbs: true,
      tags: {
        component: 'talktome-client'
      }
    }
  },
  inviteUrl: 'https://goo.gl/forms/gd3nPeuDWbhghGzY2'
}

export default config
