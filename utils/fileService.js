const fs = require('graceful-fs')

const fileService = {
  createOutputStream(path) {
    return fs.createWriteStream(path, {
      flags: 'a', // append
    })
  },
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
  writeLine(path, data) {
    fs.writeFile(path, `\n${data}`, function (err) {
      if (err) throw err
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
