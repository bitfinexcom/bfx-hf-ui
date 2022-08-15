module.exports = (win) => {
  return [
    { label: 'Honey Bitfinex' },
    { type: 'separator' },
    {
      label: 'Hide/show application',
      click: () => (win.isVisible() ? win.hide() : win.show()),
    },
  ]
}
