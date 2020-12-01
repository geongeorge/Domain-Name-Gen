const fs = require('fs')

const fileService = {
  read(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', function (err, data) {
        if (!err) {
          resolve(data)
          return
        }
        reject(err)
      })
    })
  },
  appendLine(path, data) {
    fs.appendFile(path, `\n${data}`, function (err) {
      if (err) throw err
    })
  },
  fileExists(path) {
    return fs.existsSync(path)
  },
}

module.exports = fileService
