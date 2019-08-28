import React from 'react'
import ClassNames from 'classnames'

import Button from '../Button'
import './style.css'

// TODO: Extract props
export default class PanelSettings extends React.PureComponent {
  render () {
    const { title = 'Settings', content, center, onClose } = this.props

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
