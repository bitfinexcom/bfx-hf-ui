import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import ClassNames from 'classnames'

import { propTypes, defaultProps } from './Panel.props'
import './style.css'

export default class Panel extends React.Component {
  static propTypes = propTypes

  static defaultProps = defaultProps

  state = {}
  getTabTitle(tab) { //eslint-disable-line
    const { htmlKey, tabtitle } = tab.props
    if (typeof tabtitle === 'string') {
      return tabtitle
    }
    if (!htmlKey) console.trace('htmlKey missing')
    return htmlKey
  }
  getForcedTab(forcedTab, tabs) { //eslint-disable-line
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].props.tabtitle === forcedTab) {
        return tabs[i]
      }
    }
  }
  render() {
    const {
      label,
      className,
      onRemove,
      hideIcons,
      children = [],
      headerComponents,
      extraIcons,
      moveable,
      removeable,
      modal,
      footer,
      settingsOpen,
      onToggleSettings,
      darkHeader,
      dark,
      showChartMarket,
      chartMarketSelect,
      secondaryHeaderComponents,
      secondaryHeaderReverse,
      closePanel,
      forcedTab = '',
    } = this.props
    const tabs = React.Children.toArray(children).filter(c => c && c.props.tabtitle)
    const { selectedTab = forcedTab.length ? this.getForcedTab(forcedTab, tabs) : tabs[0] } = this.state
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
          { closePanel && (
            <p className='hfui-panel__close' onClick={closePanel}>X</p>
          )}
          {tabs.length > 0 && (
            <ul className='hfui-panel__header-tabs'>
              {tabs.map(tab => (
                <li
                  key={tab.props.htmlKey || tab.props.tabtitle}
                  className={ClassNames({ active: this.getTabTitle(tab) === this.getTabTitle(selectedTab) })}
                  onClick={() => this.setState(() => ({ selectedTab: tab }))}
                >
                  <p className='hfui-panel__label'>
                    {tab.props.tabtitle}
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

              {showChartMarket && (
                <div className='hfui-panel__chart-market-select'>
                  { chartMarketSelect }
                </div>
              )}

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
            {
              (tabs.length > 0) && (
                selectedTab
              )
            }
            {
              (tabs.length === 0) && (
                children
              )
            }
          </Scrollbars>
        </div>

        {footer && (
          <div className='hfui-panel__footer'>{footer}</div>
        )}
      </div>
    )
  }
}
