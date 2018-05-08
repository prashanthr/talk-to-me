import jwt from 'jsonwebtoken'
import config from 'config'
import basicAuth from 'basic-auth'
import _debug from 'debug'

const debug = _debug('service:auth')

class AuthService {
  async authenticateViaCode (code) {
    return this.createToken({ uid: code })
  }

  async authenticate ({ email, password }) {
    const areCredentialsValid = (
      email === config.auth.email && password === config.auth.password
    )
    if (areCredentialsValid) {
      return this.createToken({ uid: email })
    } else {
      return null
    }
  }
  parseBasicAuth (req) {
    return basicAuth(req)
  }

  async verifyToken (token) {
    return new Promise((resolve, reject) => {
      if (!config.auth.secret || config.auth.secret === ':secret') return reject('Invalid secret')
      jwt.verify(
        token,
        new Buffer(config.auth.secret, 'base64'),
        { audience: config.auth.audience }, (err, payload) => {
          if (err) {
            return reject(err)
          }
          resolve(payload)
        })
    })
  }

  createToken ({ uid }) {
    if (!config.auth.secret || config.auth.secret === ':secret') {
      debug('Secret not set')
      return null
    }
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + config.auth.expirySeconds
    const token = jwt.sign(
      { code: uid,
        iat,
        exp
      },
      new Buffer(config.auth.secret, 'base64'),
      { audience: config.auth.audience }
    )
    return {
      code: uid,
      exp,
      token
    }
  }
}

export default new AuthService()
