import InviteService from '../services/invite'
import AuthService from '../services/auth'
import _debug from 'debug'

const debug = _debug('api')

const api = (app) => {
  app.post('/api/authenticate', async (req, res, next) => {
    try {
      const code = req.body.code
      if (!code) return res.status(400).send({ message: 'No invite code specified' })
      const isCodeValid = InviteService.verifyCode(code)
      if (isCodeValid) {
        debug(`Code ${code} is valid`)
        const auth = await AuthService.authenticateViaCode(code)
        debug('credentials', auth)
        if (!auth) {
          throw new Error('Received bad credentials from server')
        } else {
          return res.send({ code, auth })
        }
      } else {
        return res.status(403).send({ code, message: 'Invalid code' })
      }
    } catch (err) {
      const message = `Error authenticating user / unable to verify code - ${err.message}`
      debug(message)
      res.status(500).send({ message })
      next(err)
    }
  })
}

export default api
