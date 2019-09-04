const fs = require('fs-extra')
const path = require('path')
const winston = require('winston')

require('winston-daily-rotate-file')

const maxLogFiles = 14

const getLogDirectoryPath = () => {
  // Production: path.join(process.execPath, 'logs')
  const logDirectoryPath = path.resolve('.')
  return logDirectoryPath
}

const initializeWinston = path => {
  const fileLoggerConfig = {
    filename: path,
    handleExceptions: false,
    json: false,
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: 'info',
    maxFiles: maxLogFiles
  }

  const fileLogger = new winston.transports.DailyRotateFile(fileLoggerConfig)
  fileLogger.on('error', () => { /* Handle errors here. */ })

  const consoleLogger = new winston.transports.Console({
    level: 'debug'
  })

  winston.configure({
    transports: [ consoleLogger, fileLogger ]
  })

  return winston.log
}

let loggerPromise

const getLogger = () => {
  if (loggerPromise) {
    return loggerPromise
  }

  loggerPromise = new Promise((resolve, reject) => {
    const logDirectory = getLogDirectoryPath()

    try {
      const logger = initializeWinston(logDirectory)
      resolve(logger)
    } catch (err) {
      reject(err)
    }
  })

  return loggerPromise
}

const log = async (level, message) => {
  try {
    const logger = await getLogger()
    await logger(level, message, err => {
      if (err) {
        return Promise.reject(err)
      } else {
        return Promise.resolve()
      }
    })
  } catch (err) {
    // Handle errors from Winston.
  }
}

module.exports = { log }