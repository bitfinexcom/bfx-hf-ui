const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'electronService',
    {
        saveKeyToEStore: (key, value) => ipcRenderer.send('save_store_data', key, value),
        getKeyFromEStore: (key) => ipcRenderer.send('get_store_data', key),
        deleteKeyFromEStore: (key) => ipcRenderer.send('delete_store_data', key),
        addReceievedStoreDataListener: (cb) => ipcRenderer.on('receieved_store_data', cb),
        sendCheckSafeStorageAvl: () => ipcRenderer.send('check_safe_storage'),
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
