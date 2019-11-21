import React from 'react'
import ClassNames from 'classnames'
import _isEmpty from 'lodash/isEmpty'
import NavbarButton from '../NavbarButton'
import MANIFEST from '../../../package.json'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import { COMPONENT_TYPES } from '../GridLayout/GridLayout.helpers'
import { propTypes, defaultProps } from './StatusBar.props'
import './style.css'

// NOTE: Temporary until relevant logic is moved into LayoutControlToolbar
// This just force disables the layout controls regardless of props; all logic
// implementing the controls must be moved from this component
const LAYOUT_CONTROLS_ENABLED = false

export default class StatusBar extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    componentListOpen: false,
    layoutListOpen: false,
    layoutCreatorOpen: false,
    newLayoutName: '',
  }

  constructor(props) {
    super(props)

    this.onToggleComponentList = this.onToggleComponentList.bind(this)
    this.onToggleLayoutList = this.onToggleLayoutList.bind(this)
    this.onToggleLayoutCreator = this.onToggleLayoutCreator.bind(this)
    this.onChangeNewLayoutName = this.onChangeNewLayoutName.bind(this)
    this.onCreateNewLayout = this.onCreateNewLayout.bind(this)
    this.onDeleteLayout = this.onDeleteLayout.bind(this)
    this.onChangeLayout = this.onChangeLayout.bind(this)
  }

  onToggleComponentList() {
    this.setState(({ componentListOpen }) => ({
      componentListOpen: !componentListOpen,
      layoutListOpen: false,
      layoutCreatorOpen: false,
    }))
  }

  onToggleLayoutList() {
    this.setState(({ layoutListOpen }) => ({
      layoutListOpen: !layoutListOpen,
      componentListOpen: false,
      layoutCreatorOpen: false,
    }))
  }

  onToggleLayoutCreator() {
    this.setState(({ layoutCreatorOpen }) => ({
      layoutCreatorOpen: !layoutCreatorOpen,
      layoutListOpen: false,
      componentListOpen: false,
      newLayoutName: '',
    }))
  }

  onChangeNewLayoutName(newLayoutName) {
    this.setState(() => ({ newLayoutName }))
  }

  onSelectComponent(component) {
    const { onAddComponentToLayout } = this.props

    onAddComponentToLayout(component)

    this.setState(() => ({ componentListOpen: false }))
  }

  onCreateNewLayout() {
    const { newLayoutName } = this.state
    const { onCreateNewLayout } = this.props

    onCreateNewLayout(newLayoutName)

    this.setState(() => ({ layoutCreatorOpen: false }))
  }

  onChangeLayout(id) {
    const { onChangeLayout } = this.props
    onChangeLayout(id)

    this.setState(() => ({ layoutListOpen: false }))
  }

  onDeleteLayout(id) {
    const { onDeleteLayout } = this.props
    onDeleteLayout(id)
  }

  render() {
    const {
      layoutListOpen, componentListOpen, newLayoutName, layoutCreatorOpen,
    } = this.state

    const {
      onSaveLayout, layoutDirty, displayLayoutControls, layoutName,
      layoutNames, wsConnected, allowTradingComponents, layoutCanDelete,
      remoteVersion, apiClientStates, currentExchange,
    } = this.props

    const apiClientState = apiClientStates[currentExchange]
    const apiClientConnected = apiClientState === 2
    const apiClientConnecting = apiClientState === 1
    const apiClientDisconnected = !apiClientState

    return (
      <div className='hfui-statusbar__wrapper'>
        {LAYOUT_CONTROLS_ENABLED && displayLayoutControls && (
          <div className='hfui-statusbar__left'>
            <div className='hfui-statusbar__layout-name'>
              <p>Layout</p>

              <p
                className='hfui-statusbar__layout-active-name'
                onClick={this.onToggleLayoutList}
              >
                {layoutName}
                <i className='fas fa-chevron-up' />
              </p>

              <i
                onClick={layoutName === 'Default'
                  ? () => {}
                  : () => this.onDeleteLayout(layoutName)
                }

                className={ClassNames('fas fa-trash-alt', {
                  disabled: !layoutCanDelete,
                })}
              />

              <i
                onClick={onSaveLayout}
                className={ClassNames('far fa-save', {
                  yellow: layoutDirty,
                })}
              />

              {layoutListOpen && (
                <ul className='hfui-statusbar__popuplist-wrapper'>
                  {layoutNames.map(name => (
                    <li
                      key={name}
                      onClick={() => this.onChangeLayout(name)}
                      className={ClassNames({
                        yellow: name === layoutName,
                        selected: name === layoutName,
                      })}
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className='icon with-popuplist'>
              <p
                onClick={this.onToggleLayoutCreator}
              >
Add Layout
                <i className='fas fa-plus' />
              </p>

              {layoutCreatorOpen && (
                <ul className='hfui-statusbar__popuplist-wrapper form'>
                  <li className='nohover'>
                    <Input
                      type='text'
                      placeholder='Layout Name'
                      onChange={this.onChangeNewLayoutName}
                      value={newLayoutName}
                    />
                  </li>
                  <li className='nohover center'>
                    <Button
                      label='Create'
                      onClick={this.onCreateNewLayout}
                      disabled={_isEmpty(newLayoutName)}
                      green
                    />
                  </li>
                </ul>
              )}
            </div>

            <div className='icon with-popuplist'>
              <p
                onClick={this.onToggleComponentList}
                className={ClassNames({
                  yellow: componentListOpen,
                })}
              >
Add Component
                <i className='fas fa-plus' />
              </p>

              {componentListOpen && (
                <ul className='hfui-statusbar__popuplist-wrapper'>
                  <li onClick={this.onSelectComponent.bind(this, COMPONENT_TYPES.CHART)}>Chart</li>
                  <li onClick={this.onSelectComponent.bind(this, COMPONENT_TYPES.ORDER_BOOK)}>Order Book</li>
                  <li onClick={this.onSelectComponent.bind(this, COMPONENT_TYPES.TRADES_TABLE)}>Trades Table</li>
                  {allowTradingComponents && (<li onClick={this.onSelectComponent.bind(this, COMPONENT_TYPES.TRADING_STATE_PANEL)}>Trading State</li>)}
                  {allowTradingComponents && (<li onClick={this.onSelectComponent.bind(this, COMPONENT_TYPES.ORDER_FORM)}>Order Form</li>)}
                </ul>
              )}
            </div>
          </div>
        )}

        <div className='hfui-statusbar__right'>
          <div
            className='hfui-statusbar__version'
          >
            <p>
              {remoteVersion && remoteVersion !== MANIFEST.version ? (
                <NavbarButton
                  label='Update to latest version'
                  external='https://github.com/bitfinexcom/bfx-hf-ui/releases'
                />
              ) : null}
              &nbsp;
              v
              {MANIFEST.version}
            </p>
          </div>
          <div className='hfui-statusbar__connection-status'>
            <div className='hfui-statusbar__connection' key='lockstatus'>
              <p>{apiClientConnected ? `UNLOCKED FOR ${currentExchange.toUpperCase()}` : 'LOCKED'}</p>
            </div>
            <div className='hfui-statusbar__connection-status' key='connectionstatus'>
              <span className={ClassNames('hfui-statusbar__statuscircle', {
                green: apiClientConnected,
                yellow: apiClientConnecting,
                red: apiClientDisconnected,
              })}
              />

              <p>
                {apiClientConnected
                  ? 'HF Connected'
                  : apiClientConnecting
                    ? 'HF Connecting'
                    : 'HF Disconnected'
              }
              </p>
            </div>
            <p>{wsConnected ? 'WS Connected' : 'WS Disconnected'}</p>
            <span className={ClassNames('hfui-statusbar__statuscircle', {
              green: wsConnected,
              red: !wsConnected,
            })}
            />
          </div>
        </div>
      </div>
    )
  }
}
