// https://sentry.io
import config from '../../config'
import raven from 'raven-js'

const sentryConfig = config.log.sentry
const sentry = () => {
  if (sentryConfig.enabled) {
    console.log('Sentry is enabled')
    raven.config(sentryConfig.dsn, {
      environment: process.env.NODE_ENV || 'development',
      release: process.env.APP_VERSION,
      captureUnhandledRejections: sentryConfig.captureUnhandledRejections,
      autoBreadcrumbs: sentryConfig.autoBreadcrumbs,
      tags: sentryConfig.tags
    }).install()

    // Global sentry handlers
    window.captureException = (err, context) => {
      if (context) {
        raven.captureException(err, { extra: context })
      } else {
        raven.captureException(err)
      }
    }
    window.captureBreadcrumb = crumb => {
      raven.captureBreadcrumb(crumb)
    }
    window.captureMessage = (message, options) => {
      raven.captureMessage(message, options)
    }
  } else {
    console.log('Sentry is disabled')
    window.captureException = err => {}
    window.captureBreadcrumb = crumb => {}
    window.captureMessage = (message, options) => {}
  }
}
export default sentry
