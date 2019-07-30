import React from 'react'
import Settings from '../../ui/SettingsMenu'

export default class SettingsView extends React.Component {
  render() {
    return (
      <div className='hfui_view__wrapper'>
        <h1>Settings</h1>
        <Settings />
      </div>
    )
  }
}
