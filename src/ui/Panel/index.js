import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import ClassNames from 'classnames'

import { propTypes, defaultProps } from './Panel.props'
import './style.css'

export default class Panel extends React.PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  render() {
    const {
      className, label, children, onRemove, headerComponents, hideIcons,
      extraIcons, moveable, removeable, modal, footer, settingsOpen,
      onToggleSettings, tabs, activeTab, onChangeTab, darkHeader, dark,
      secondaryHeaderComponents, secondaryHeaderReverse, type, isNotificationsOpened, toggle,
    } = this.props

    let heightOffsetPX = 0

    if (label || tabs) heightOffsetPX += 50
    if (footer) heightOffsetPX += 35

    return (
      <div
        className={ClassNames('hfui-panel', className, {
          'dark-header': darkHeader,
          dark,
        })}
      >
        <div
          className={ClassNames('hfui-panel__header', {
            'has-secondary-header': !!secondaryHeaderComponents,
          })}
        >
          {label && <p className='hfui-panel__label'>{label}</p>}
          { type === 'notifications' && <p className='hfui-panel__close' onClick={() => toggle(isNotificationsOpened)}>X</p>}
          {tabs && (
            <ul className='hfui-panel__header-tabs'>
              {tabs.map(tab => (
                <li
                  key={tab.id}
                  className={ClassNames({ active: tab.id === activeTab })}
                  onClick={() => onChangeTab(tab.id)}
                >
                  <p className='hfui-panel__label'>
                    {tab.label}
                    {' '}
                    {tab.suffix}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {headerComponents && (
            <div className='hfui-panel__header-components'>
              {headerComponents}
            </div>
          )}

          {!hideIcons && (
            <div className='hfui-panel__header-icons'>
              {removeable && (
                <i onClick={onRemove} className='icon-cancel' />
              )}

              {moveable && <i className='icon-move' />}

              {onToggleSettings && (
                <i
                  onClick={onToggleSettings}
                  className={ClassNames('icon-settings-icon', {
                    yellow: settingsOpen,
                  })}
                />
              )}

              {extraIcons}
            </div>
          )}
        </div>

        {secondaryHeaderComponents && (
          <div
            className={ClassNames('hfui-panel__secondaryheader__wrapper', {
              reverse: secondaryHeaderReverse,
            })}
          >
            {secondaryHeaderComponents}
          </div>
        )}

        <div
          className='hfui-panel__content'
          style={{
            height: `calc(100% - ${heightOffsetPX}px)`,
          }}
        >
          {modal}

          <Scrollbars
            renderTrackVertical={props => (
              <div {...props} className='hfui-scrollbars-track-vertical' />
            )}

            renderThumbVertical={props => (
              <div {...props} className='hfui-scrollbars-thumb-vertical' />
            )}
          >
            {children}
          </Scrollbars>
        </div>

        {footer && (
          <div className='hfui-panel__footer'>{footer}</div>
        )}
      </div>
    )
  }
}
