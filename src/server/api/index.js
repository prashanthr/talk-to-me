import InviteService from '../services/invite'
import AuthService from '../services/auth'
import _debug from 'debug'

const debug = _debug('api')

const api = (app) => {
  app.post('/api/check-invite', async (req, res) => {
    try {
      const code = req.body.code
      if (!code) return res.status(400).send({ message: 'No code specified' })
      const isCodeValid = InviteService.verifyCode(code)
      if (isCodeValid) {
        return res.json({
          code,
          isValid: true
        })
      } else {
        return res.status(404).send({
          code,
          isValid: false
        })
      }
    } catch (err) {
      const message = 'Error verifying invite code'
      debug(message, err)
      res.status(500).send({ message: `${message} - ${err.message}` })
    }
  })

  app.post('/api/login', async (req, res) => {
    try {
      const code = req.body.code
      if (!code) return res.status(400).send({ message: 'No code specified' })
      const isCodeValid = InviteService.verifyCode(code)
      if (isCodeValid) {
        const credentials = await AuthService.authenticateViaCode(code)
        if (!credentials) {
          return res.status(403).send('Bad or invalid credentials')
        }
        return res.json(credentials)
      } else {
        return res.status(403).send({ message: 'Invalid code' })
      }
    } catch (err) {
      const message = 'Error logging in'
      debug(message, err)
      res.status(500).send({ message: `${message} - ${err.message}` })
    }
  })
}

export default api
