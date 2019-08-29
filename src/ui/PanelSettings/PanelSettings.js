import React from 'react'
import ClassNames from 'classnames'

import Button from '../Button'
import { propTypes, defaultProps } from './PanelSettings.props'
import './style.css'

export default class PanelSettings extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      title, content, center, onClose,
    } = this.props

    return (
      <div className='dtc-panelsettings__wrapper'>
        {title && (<p className='header'>{title}</p>)}
        {content && (
          <div className={ClassNames('inner', { center })}>{content}</div>
        )}

        <div className='footer'>
          <Button
            label='Close'
            onClick={onClose}
          />
        </div>
      </div>
    )
  }
}
