import _isFunction from 'lodash/isFunction'

const closeElectronApp = () => {
  if (_isFunction(window.require)) {
    const electron = window.require('electron')
    const { ipcRenderer } = electron
    ipcRenderer.send('app-closed')
  }
}

export default closeElectronApp
