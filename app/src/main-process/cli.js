const chalk = require('chalk')

const getLaunchArguments = processArgv => {
  const help = processArgv.some(val => val === '--help' || val === '-h')
  const dev = processArgv.some(val => val === '--dev' || val === '-D')
  const showChangelog = processArgv.some(val => val === '--show-changelog' || val === '-ch')
  const disableHardwareAcceleration = processArgv.some(val => val === '--disable-hardware-acceleration' || val === '-dha')

  return { help, dev, showChangelog, disableHardwareAcceleration }
}

module.exports = { getLaunchArguments }