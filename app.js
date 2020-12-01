const chalk = require('chalk')

const fileService = require('./utils/fileService')
const dnsService = require('./utils/dnsService')

const DICT_1 = './dicts/1.txt'
const DICT_2 = './dicts/2.txt'
const OUTPUT_DIR = './output'
const OUTPUT_FILE_NAME = 'out'
const CHECK_VICE_VERSA = false
const TLD = 'com'

const log = console.log
const logWarningLine = (line) => log(chalk.yellow(line))
const logSuccessLine = (line) => log(chalk.green(line))
const logErrorLine = (line) => log(chalk.red(line))

// Initialize output file
let outFile = `./${OUTPUT_DIR}/${OUTPUT_FILE_NAME}.txt`
let count = 0
while (fileService.fileExists(outFile)) {
  count++
  outFile = `./${OUTPUT_DIR}/${OUTPUT_FILE_NAME}${count}.txt`
}
const timestamp = new Date().toLocaleString().replace(',', '')
const headLine = `Possibly Available Domains (${timestamp})`
fileService.writeLine(outFile, headLine)
// End initialzing output file

const writeToOutput = (data) => {
  fileService.appendLine(outFile, data)
}

const checkWordlist = (words1, words2) => {
  words1.forEach((word1) => {
    words2.forEach((word2) => {
      let currentWord = word1 + word2
      let currentDomain = `${currentWord}.${TLD}`

      dnsService.available(currentDomain).then((exists) => {
        if (exists) {
          logSuccessLine(`${currentDomain}`)
          writeToOutput(currentDomain)
        } else {
          logWarningLine(`${currentDomain}`)
        }
      })
    })
  })
}

const main = async () => {
  const list1 = await fileService.read(DICT_1)
  const list2 = await fileService.read(DICT_2)

  const [words1, words2] = [list1.split('\n'), list2.split('\n')]

  checkWordlist(words1, words2)

  if (CHECK_VICE_VERSA) {
    checkWordlist(words2, words1)
  }
}

main()
