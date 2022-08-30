const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electronService',
  {
    sendAppClosedEvent: () => ipcRenderer.send('app-closed'),
    sendRestartAppEvent: () => ipcRenderer.send('restart_app'),
    sendClearAppUpdateTimerEvent: () => ipcRenderer.send('clear_app_update_timer'),
    sendRestoreAppMessage: () => ipcRenderer.send('app_should_restored'),
    sendChangeFullscreenEvent: (fullscreen) => ipcRenderer.send('app_change_fullscreen', { fullscreen }),

    addAppUpdateAvailableEventListener: (cb) => ipcRenderer.on('update_available', cb),
    removeAppUpdateAvailableEventListener: (cb) => ipcRenderer.removeListener('update_available', cb),

    addAppUpdateDownloadedEventListener: (cb) => ipcRenderer.on('update_downloaded', cb),
    removeAppUpdateDownloadedEventListener: (cb) => ipcRenderer.removeListener('update_downloaded', cb),

    getAllEvents: () => ipcRenderer.eventNames(),

    addAppCloseEventListener: (cb) => ipcRenderer.on('app-close', cb),
    addOpenSettingsModalListener: (cb) => ipcRenderer.on('open_settings', cb),
    addAppHiddenListener: (cb) => ipcRenderer.on('app_hidden', cb),
    addAppRestoredListener: (cb) => ipcRenderer.on('app_restored', cb),
    addFullscreenChangeListener: (cb) => ipcRenderer.on('app_fullscreen_changed', cb),

    removeAllGlobalListeners: () => {
      ipcRenderer.removeAllListeners('app-close')
      ipcRenderer.removeAllListeners('open_settings')
      ipcRenderer.removeAllListeners('app_hidden')
      ipcRenderer.removeAllListeners('app_restored')
      ipcRenderer.removeAllListeners('app_fullscreen_changed')
    },
  },
)
