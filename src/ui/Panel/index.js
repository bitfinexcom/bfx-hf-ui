import React from 'react'
import ClassNames from 'classnames'
import Scrollbars from '../Scrollbars'
import Header from './Header'

import { getTabs } from './Panel.helpers'
import { propTypes, defaultProps } from './Panel.props'
import './style.css'

class Panel extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = { selectedTabIndex: 0 }

  onTabClick = (selectedTabIndex) => {
    this.setState(() => ({ selectedTabIndex }))
  }

  get heightOffsetPX() {
    const { label, tabs, footer } = this.props
    let heightOffsetPX = 0

    if (label || tabs) {
      heightOffsetPX += 50
    }

    if (footer) {
      heightOffsetPX += 35
    }

    return heightOffsetPX
  }

  render() {
    const { heightOffsetPX } = this
    const { selectedTabIndex } = this.state
    const {
      className, children, headerComponents, modal, footer, darkHeader, dark,
      secondaryHeaderComponents, secondaryHeaderReverse,
    } = this.props

    const tabs = getTabs(children)

    return (
      <div
        className={ClassNames('hfui-panel', className, {
          'dark-header': darkHeader, dark,
        })}
      >
        <Header
          {...this.props}

          tabs={tabs}
          components={headerComponents}
          onTabClick={this.onTabClick}
          selectedTabIndex={selectedTabIndex}
          hasSecondaryHeader={!!secondaryHeaderComponents}
        />

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
          style={{ height: `calc(100% - ${heightOffsetPX}px)` }}
        >
          {modal}

          <Scrollbars>
            {tabs[selectedTabIndex] || children}
          </Scrollbars>
        </div>

        {footer && (<div className='hfui-panel__footer'>{footer}</div>)}
      </div>
    )
  }
}

export default Panel
