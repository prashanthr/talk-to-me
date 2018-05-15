import config from '../../config'

const analytics = () => {
  console.log('Analytics is enabled')
  window.dataLayer = window.dataLayer || []
  function gtag () { window.dataLayer.push(arguments) }
  gtag('js', new Date())
  gtag('config', config.analytics.google.propertyId)
}

export default analytics
