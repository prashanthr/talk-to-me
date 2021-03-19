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
    enabled: true,
    google: {
      propertyId: 'UA-117106220-2'
    }
  },
  log: {
    sentry: {
      enabled: true,
      dsn: 'https://e49bb58cac3e47a6b80f1619d8a20391@o152849.ingest.sentry.io/1205381',
      captureUnhandledRejections: true,
      autoBreadcrumbs: true,
      debug: true,
      tracesSampleRate: 1.0,
      tags: {
        component: 'talktome-client'
      }
    }
  },
  inviteCode: 'ilovetheinternet',
  inviteUrl: 'https://goo.gl/forms/gd3nPeuDWbhghGzY2',
  contactUrl: 'https://goo.gl/forms/NRyqULBDE4sT5EN33',
  coffeeUrl: 'https://www.buymeacoffee.com/TGuwXOA',
  bugUrl: 'https://forms.gle/LzjbDPqZpU5aUGzR9',
  recaptchaSiteKey: '6LfGgf0ZAAAAAA2X1aj5KQGKvpDTOd8VRtprrOFw'
}

export default config
