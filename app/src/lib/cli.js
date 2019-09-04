const { ipcRenderer } = window.require('electron')

export const getCLIArgsFromMainProcess = () => {
  ipcRenderer.send('get-cli-args')

  ipcRenderer.on('returned-cli-args', (event, args) => {
    console.log(args)
    return Promise.resolve(args)
  })
}