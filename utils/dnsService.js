const dns = require('dns')

const dnsService = {
  exists(domain) {
    return new Promise((resolve) => {
      dns.lookup(domain, (error) => resolve(!error))
    })
  },
}

module.exports = dnsService
