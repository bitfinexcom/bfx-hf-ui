const { nativeImage, Tray, Menu } = require('electron')
const path = require('path')

const getTemplate = ({ win, sendOpenSettingsModalMessage }) => [
  { label: 'Bitfinex Honey', enabled: false },
  { type: 'separator' },
  {
    label: 'Hide/show application',
    click: () => (win.isVisible() ? win.hide() : win.show()),
  },
  {
    label: 'Open settings',
    click: sendOpenSettingsModalMessage,
  },
  {
    role: 'quit',
  },
]

const createAppTray = (params) => {
  const img = nativeImage.createFromPath(
    path.resolve(__dirname, '../trayIcon.png'),
  )
  const tray = new Tray(img)
  tray.setContextMenu(Menu.buildFromTemplate(getTemplate(params)))
}

module.exports = {
  createAppTray,
}
