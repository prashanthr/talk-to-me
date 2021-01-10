import config from '../../config'

const analyticsEnabledLocalStorageKey = 'is-ga-analytics-enabled'

const getLocalStorage = (key, defaultValue = null) => {
  const item = window.localStorage.getItem(key)
  return item 
    ? JSON.parse(item)
    : defaultValue
}

const setLocalStorage = (key, value = null) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const isAnalyticsSetup = () => {
  const item = getLocalStorage(analyticsEnabledLocalStorageKey, false)
  return item === true
}

// https://developers.google.com/analytics/devguides/collection/gtagjs
const setupAnalytics = (propertyId) => {
  const defaultParams = { 
    'anonymize_ip': true, 
    'allow_ad_personalization_signals': false 
  }
  window.dataLayer = window.dataLayer || []
  function gtag () { window.dataLayer.push(arguments) }
  gtag('js', new Date())
  gtag('config', propertyId, defaultParams)
  setLocalStorage(analyticsEnabledLocalStorageKey, true)
}

const analytics = () => {
  if (window && config.analytics.enabled) {
    if (isAnalyticsSetup()) {
      console.info('Analytics active')
    } else {
      setupAnalytics(config.analytics.google.propertyId)
      console.info('Analytics loaded')
    }
  }
}

export default analytics
