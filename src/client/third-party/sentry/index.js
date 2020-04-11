// https://sentry.io
import config from '../../config'
import * as Sentry from '@sentry/browser'

const sentryConfig = config.log.sentry
const sentry = () => {
  if (sentryConfig.enabled && sentryConfig.dsn) {
    console.log('Logging is enabled')
    Sentry.init({
      dsn: sentryConfig.dsn,
      environment: process.env.NODE_ENV || 'development',
      release: process.env.APP_VERSION,
      captureUnhandledRejections: sentryConfig.captureUnhandledRejections,
      autoBreadcrumbs: sentryConfig.autoBreadcrumbs,
      tags: sentryConfig.tags
    })

    // Global sentry handlers
    window.captureException = (err, context) => {
      captureException(err, context)
    }
    window.captureBreadcrumb = crumb => {
      captureBreadcrumb(crumb)
    }
    window.captureMessage = (message, options) => {
      captureMessage(message, options)
    }
    window.showErrorDialog = eventId => {
      showErrorDialog(eventId || Sentry.lastEventId)
    }
  } else {
    console.log('Logging is disabled')
    window.captureException = err => {}
    window.captureBreadcrumb = crumb => {}
    window.captureMessage = (message, options) => {}
    window.showErrorDialog = eventId => {}
  }
}

export const showErrorDialog = (eventId) => {
    Sentry.showReportDialog({
      eventId: eventId,
      dsn: sentryConfig.dsn
    })
}

export const captureException = (err, context) => {
  if (context) {
    Sentry.captureMessage(err, { extra: context} )
  } else {
    Sentry.captureMessage(err)
  }
}

export const captureBreadcrumb = crumb => {
  Sentry.addBreadcrumb(crumb)
}

export const captureMessage = (message, options) => {
  Sentry.captureMessage(message, options)
}

export default sentry
