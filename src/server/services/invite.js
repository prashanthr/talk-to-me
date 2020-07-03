// import inviteCodes from '../../../config/secrets/invite-codes.json'

const inviteCodes = ['ilovetheinternet']

class InviteService {
  constructor () {
    this.codes = inviteCodes || []
  }

  verifyCode (code) {
    return this.codes.includes(code)
  }
}

export default new InviteService()
