import React from 'react'
import ClassNames from 'classnames'
import NavbarButton from '../NavbarButton'
import MANIFEST from '../../../package.json'
import { propTypes, defaultProps } from './StatusBar.props'
import i18n from './i18n.json'
import './style.css'

export default class StatusBar extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps
  render() {
    const {
      wsConnected, remoteVersion, apiClientStates, currentExchange, toggleFeedback, feedbackVisible, lang,
    } = this.props

    const dictionary = i18n[lang] || {}

    const apiClientState = apiClientStates[currentExchange]
    const apiClientConnected = apiClientState === 2
    const apiClientConnecting = apiClientState === 1
    const apiClientDisconnected = !apiClientState

    return (
      <div className='hfui-statusbar__wrapper'>
        <div className='hfui-statusbar__left'>
          <p>
            {remoteVersion && remoteVersion !== MANIFEST.version ? (
              <NavbarButton
                label={dictionary.update}
                external='https://github.com/bitfinexcom/bfx-hf-ui/releases'
              />
            ) : null}
            &nbsp;
            v
            {MANIFEST.version}
          </p>

          <p>
            {apiClientConnected
              ? `${dictionary.unlockedFor} ${currentExchange.toUpperCase()}`
              : `${dictionary.locked}`}
          </p>
          <p
            className='feedback'
            onClick={() => toggleFeedback(feedbackVisible)}
          >
            {dictionary.feedback}
          </p>
        </div>

        <div className='hfui-statusbar__right'>
          <p>
            {apiClientConnected
              ? dictionary.hfConnected
              : apiClientConnecting
                ? dictionary.hfConnecting
                : dictionary.hfDisconnected}
          </p>

          <span className={ClassNames('hfui-statusbar__statuscircle', {
            green: apiClientConnected,
            yellow: apiClientConnecting,
            red: apiClientDisconnected,
          })}
          />

          <p>{wsConnected ? dictionary.wsConnected : dictionary.wsDisconnected}</p>

          <span className={ClassNames('hfui-statusbar__statuscircle', {
            green: wsConnected,
            red: !wsConnected,
          })}
          />
        </div>
      </div>
    )
  }
}
