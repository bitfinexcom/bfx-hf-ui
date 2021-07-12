import React from 'react'
import Debug from 'debug'
import _map from 'lodash/map'
import _isError from 'lodash/isError'
import _toString from 'lodash/toString'
import './style.css'

const debug = Debug('hfui:crash-screen')

class CrashHandler extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appCrashed: false,
      crashStack: '',
    }
  }

  static getDerivedStateFromError(error) {
    return {
      crashStack: _isError(error) ? error.stack : _toString(error),
      appCrashed: true,
    }
  }

  componentDidCatch(error) {
    debug('The HFUI crashed: %s', error)
  }

  render() {
    const { appCrashed, crashStack } = this.state
    const { children } = this.props

    if (appCrashed) {
      console.log(crashStack)
      return (
        <div className='hfui-crash_screen-wrapper'>
          <div className='hfui-crash_screen'>
            <h1>:(</h1>
            <h2>An error occurred that caused the Honey Framework UI to halt. Please, restart the application to proceed working with it.</h2>
            <h4>
              Please, report this issue at&nbsp;
              <a href='https://github.com/bitfinexcom/bfx-hf-ui/issues' target='_blank' rel='noopener noreferrer'>https://github.com/bitfinexcom/bfx-hf-ui/issues</a>
              ,&nbsp;
              <br />
              so we would be able to fix it as soon as possible!
            </h4>
            <h5>
              Technical crash info:
              <div className='hfui-crash_screen-crashstack'>
                {crashStack}
              </div>
            </h5>
          </div>
        </div>
      )
    }

    return children
  }
}

export default CrashHandler
