const { contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld(
    'electronService',
    {
        sendAppClosedEvent: () => ipcRenderer.send('app-closed'),
        sendRestartAppEvent: () => ipcRenderer.send('restart_app'),
        sendClearAppUpdateTimerEvent: () => ipcRenderer.send('clear_app_update_timer'),
        addAppCloseEventListener: (cb) => ipcRenderer.on('app-close', cb),
        removeAppCloseEventListener: (cb) => ipcRenderer.removeListener('app-close', cb),
        addAppUpdateAvailableEventListener: (cb) => ipcRenderer.on('update_available', cb),
        removeAppUpdateAvailableEventListener: (cb) => ipcRenderer.removeListener('update_available', cb),
        addAppUpdateDownloadedEventListener: (cb) => ipcRenderer.on('update_downloaded', cb),
        removeAppUpdateDownloadedEventListener: (cb) => ipcRenderer.removeListener('update_downloaded', cb),
        getAllEvents: () => ipcRenderer.eventNames(),
    }
)
