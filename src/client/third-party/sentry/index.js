// https://sentry.io
import config from '../../config'
import * as Sentry from "@sentry/browser"
import { Integrations } from "@sentry/tracing"

const sentryConfig = config.log.sentry
const sentry = () => {
  if (sentryConfig.enabled && sentryConfig.dsn) {
    console.info('Error reporting is enabled')
    Sentry.init({
      dsn: sentryConfig.dsn,
      environment: process.env.NODE_ENV || 'development',
      release: `${process.env.npm_package_name}@${process.env.npm_package_version ||  process.env.APP_VERSION}`,
      captureUnhandledRejections: sentryConfig.captureUnhandledRejections,
      autoBreadcrumbs: sentryConfig.autoBreadcrumbs,
      tags: sentryConfig.tags,
      debug: sentryConfig.debug,
      tracesSampleRate: sentryConfig.tracesSampleRate,
      integrations: [new Integrations.BrowserTracing()],
    })

    // Global sentry handlers
    window.captureException = (err, context) => {
      captureException(err, context)
    }
    window.captureBreadcrumb = crumb => {
      captureBreadcrumb(crumb)
    }
    window.captureMessage = (message, context) => {
      captureMessage(message, context)
    }
    window.setContext = (key, data) => {
      setContext(key, data)
    }
    window.showErrorDialog = eventId => {
      showErrorDialog(eventId)
    }
  } else {
    console.log('Error reporting is disabled')
    window.captureException = (err, context) => {}
    window.captureBreadcrumb = crumb => {}
    window.captureMessage = (message, options) => {}
    window.showErrorDialog = eventId => {}
  }
}

export const showErrorDialog = (eventId, context) => {
    Sentry.showReportDialog({
      eventId: eventId || Sentry.lastEventId(),
      dsn: sentryConfig.dsn,
      ...context
    })
}

export const setContext = (key, data) => {
  Sentry.setContext(key, data)
}

export const captureException = (err, context) => {
  Sentry.captureException(err, context)
}

export const captureBreadcrumb = crumb => {
  if (typeof crumb === 'string') {
    Sentry.addBreadcrumb({
      message: crumb
    })
  } else {
    Sentry.addBreadcrumb(crumb)
  }
}

export const captureMessage = (message, context) => {
  Sentry.captureMessage(message, context)
}

export const captureAll = ({ message, breadcrumbMessage, breadcrumb, error, context }) => {
  if (breadcrumb) {
    captureBreadcrumb(breadcrumb || breadcrumbMessage)
  }
  if (message) {
    captureMessage(message, context)
  }
  if (error){
    captureException(error, context)
  }
}

export default sentry
