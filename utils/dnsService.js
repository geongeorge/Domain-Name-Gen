const dns = require('dns')

const POSSIBLE_ERROR_CODES = ['ENOTFOUND', 'ENODATA']

const dnsService = {
  available(domain) {
    return new Promise((resolve) => {
      // NOTE: This is not 100% accurate result
      dns.resolve4(domain, (error) => {
        resolve(error && POSSIBLE_ERROR_CODES.includes(error.code))
      })
    })
  },
}

module.exports = dnsService
