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
      onToggleSettings, tabs, activeTab, onChangeTab,
    } = this.props

    let heightOffsetPX = 0

    if (label) heightOffsetPX += 33
    if (footer) heightOffsetPX += 33

    return (
      <div className={ClassNames('dtc-panel', className)}>
        <div className='dtc-panel__header'>
          {label && <p className='dtc-panel__label'>{label}</p>}

          {tabs && (
            <ul className='dtc-panel__header-tabs'>
              {tabs.map(tab => (
                <li
                  key={tab.id}
                  className={ClassNames({ active: tab.id === activeTab })}
                  onClick={() => onChangeTab(tab.id)}
                >
                  <p className='dtc-panel__label'>{tab.label} {tab.suffix}</p>
                </li>
              ))}
            </ul>
          )}

          {headerComponents && (
            <div className='dtc-panel__header-components'>
              {headerComponents}
            </div>
          )}

          {!hideIcons && (
            <div className='dtc-panel__header-icons'>
              {removeable && (
                <i onClick={onRemove} className='far fa-times-circle' />
              )}

              {moveable && <i className='fas fa-arrows-alt' />}

              {onToggleSettings && (
                <i
                  onClick={onToggleSettings}
                  className={ClassNames('fas fa-cog', {
                    yellow: settingsOpen,
                  })}
                />
              )}

              {extraIcons}
            </div>
          )}
        </div>

        <div
          className='dtc-panel__content'
          style={{
            height: `calc(100% - ${heightOffsetPX}px)`,
          }}
        >
          {modal}

          <Scrollbars
            renderTrackVertical={props => (
              <div {...props} className="dtc-scrollbars-track-vertical"/>
            )}

            renderThumbVertical={props => (
              <div {...props} className="dtc-scrollbars-thumb-vertical"/>
            )}
          >
            {children}
          </Scrollbars>
        </div>

        {footer && (
          <div className='dtc-panel__footer'>{footer}</div>
        )}
      </div>
    )
  }
}
