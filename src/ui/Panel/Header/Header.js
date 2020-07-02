import React from 'react'
import ClassNames from 'classnames'
import _isEmpty from 'lodash/isEmpty'
import HeaderTabs from '../HeaderTabs'
import { propTypes, defaultProps } from './Header.props'

class Header extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  renderIcons() {
    const {
      hideIcons, removeable, onRemove, moveable, onToggleSettings,
      isSettingsOpen, extraIcons,
    } = this.props

    if (hideIcons) {
      return null
    }

    return (
      <div className='hfui-panel__header-icons'>
        {removeable && (<i onClick={onRemove} className='icon-cancel' />)}
        {moveable && <i className='icon-move' />}
        {onToggleSettings && (
          <i
            onClick={onToggleSettings}
            className={ClassNames('icon-settings-icon', {
              yellow: isSettingsOpen,
            })}
          />
        )}
        {extraIcons}
      </div>
    )
  }

  render() {
    const {
      hasSecondaryHeader, label, onClosePanel, tabs, components, onTabClick,
      selectedTabIndex,
    } = this.props

    return (
      <div
        className={ClassNames('hfui-panel__header', {
          'has-secondary-header': !!hasSecondaryHeader,
        })}
      >
        {label && <p className='hfui-panel__label'>{label}</p>}
        {onClosePanel && (
          <p className='hfui-panel__close' onClick={onClosePanel}>X</p>
        )}

        {!_isEmpty(tabs) && (
          <HeaderTabs
            tabs={tabs}
            selectedTabIndex={selectedTabIndex}
            onTabClick={onTabClick}
          />
        )}

        {components && (
          <div className='hfui-panel__header-components'>
            {components}
          </div>
        )}

        {this.renderIcons()}
      </div>
    )
  }
}

export default Header
