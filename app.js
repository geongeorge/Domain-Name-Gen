const chalk = require('chalk')
const lineReader = require('line-reader')

const fileService = require('./utils/fileService')
const dnsService = require('./utils/dnsService')

const DICT_1 = './dicts/wordlist.txt'
const DICT_2 = './dicts/wordlist.txt'
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
  outFile = `${OUTPUT_DIR}/${OUTPUT_FILE_NAME}${count}.txt`
}

const writeToOutput = (data) => {
  outStream.cork()
  outStream.write('\n' + data)
  process.nextTick(() => outStream.uncork())
}

const timestamp = new Date().toLocaleString().replace(',', '')
const outStream = fileService.createOutputStream(outFile)
writeToOutput(`Possibly Available Domains (${timestamp})`)
// End initialzing output file

const checkWords = (word1, word2) => {
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
}

const main = () => {
  lineReader.eachLine(DICT_1, (line1) => {
    lineReader.eachLine(DICT_2, (line2) => {
      checkWords(line1, line2)
      if (CHECK_VICE_VERSA) {
        checkWords(line2, line1)
      }
    })
  })
}

main()
