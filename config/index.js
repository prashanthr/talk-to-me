/* Client side config */
let config = {}

switch (process.env.NODE_ENV) {
  case 'development':
  default:
    config = {
      port: 9095,
      appUri: "http://localhost:3000",
      apiUri: "http://localhost:9095/api",
      apiKey: "vb8gy9wfj07iizfr"
    }
}

module.exports = config
