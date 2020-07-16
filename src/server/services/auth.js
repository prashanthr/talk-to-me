import jwt from 'jsonwebtoken'
import config from 'config'
import basicAuth from 'basic-auth'
import _debug from 'debug'

const debug = _debug('service:auth')
const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase()

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

  isSafe () {
    return ENV === 'development'
  }

  isSecretInvalid () {
    const secret = process.env.AUTH_SECRET || config.auth.secret
    return (!secret || secret === ':secret')
  }

  async verifyToken (token) {
    return new Promise((resolve, reject) => {
      if (!this.isSafe() && this.isSecretInvalid()) return reject('Invalid secret / secret not set')
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
    if (!this.isSafe() && this.isSecretInvalid()) {
      debug('Invalid secret / secret not set')
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
