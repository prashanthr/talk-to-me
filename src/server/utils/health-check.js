import axios from 'axios'
import _debug from 'debug'
var debug = _debug('utils/health-check')

const healthCheck = async (endpoint) => {
  try {
    debug('Performing health check...')
    const response = await axios.get(endpoint)
    debug('Health Check Result:', response.status, response.data)
  } catch (err) {
    debug('Error performing health check', err)
  }
}

export default healthCheck
