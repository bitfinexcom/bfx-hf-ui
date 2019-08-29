import React from 'react'
import ClassNames from 'classnames'
import _isEmpty from 'lodash/isEmpty'

import MANIFEST from '../../../package.json'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import { COMPONENT_TYPES } from '../GridLayout/GridLayout.helpers'
import { propTypes, defaultProps } from './StatusBar.props'
import './style.css'

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
      layoutNames, dtcConnected, allowTradingComponents, layoutCanDelete,
    } = this.props

    return (
      <div className='dtc-statusbar__wrapper'>
        {displayLayoutControls && (
          <div className='dtc-statusbar__left'>
            <div className='dtc-statusbar__layout-name'>
              <p>Layout</p>

              <p
                className='dtc-statusbar__layout-active-name'
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
                <ul className='dtc-statusbar__popuplist-wrapper'>
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
                <ul className='dtc-statusbar__popuplist-wrapper form'>
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
                <ul className='dtc-statusbar__popuplist-wrapper'>
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

        <div className='dtc-statusbar__right'>
          <div className='dtc-statusbar__version'>
            <p>
Version
              {MANIFEST.version}
            </p>
          </div>

          <div className='dtc-statusbar__connection-status'>
            <span className={ClassNames('dtc-statusbar__statuscircle', {
              green: dtcConnected,
              red: !dtcConnected,
            })}
            />

            <p>{dtcConnected ? 'WS Connected' : 'WS Disconnected'}</p>
          </div>
        </div>
      </div>
    )
  }
}
