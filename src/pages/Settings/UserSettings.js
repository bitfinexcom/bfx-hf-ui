/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import React from 'react'
import { Toggle } from 'react-toggle-component'
import { connect } from 'react-redux'

import './style.css'

class UserSettings extends React.Component {
  state = {
    socketEnabled: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.state) === JSON.stringify(nextState)) {
      return false
    }
    return true
  }

  onToggle(key) {
    this.setState({
      [key]: !this.state[key],
    })
  }

  render() {
    const { socketEnabled } = this.state
    return (
      <div className='hfui-settings__menu'>
        <div className='hfui-settings__menu-item'>
          <div className='hfui-settings__menu-item-label'>Connection socket enabled:</div>
          <Toggle
            className='hfui-settings__menu-item-button'
            name='toggle'
            checked={socketEnabled}
            borderColor='none'
            onToggle={() => this.onToggle('socketEnabled')}
          />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log(state)
}

export default connect(mapStateToProps, null)(UserSettings)
