const analytics = () => {
  window.dataLayer = window.dataLayer || []
  function gtag () { window.dataLayer.push(arguments) }
  gtag('js', new Date())
  gtag('config', 'UA-117106220-2')
}

export default analytics
