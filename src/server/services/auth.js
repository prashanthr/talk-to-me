import jwt from 'jsonwebtoken'
import config from 'config'
import basicAuth from 'basic-auth'

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
  parseBasicAuth (req) : { name: string, pass: string } {
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
    if (!config.auth.secret || config.auth.secret === ':secret') return null
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + (60 * 60 * 24 * 14)
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