import React, { memo } from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'

import Button from '../Button'
import './style.css'

const PanelSettings = ({
  title, content, onClose,
}) => {
  return (
    <div className='hfui-panelsettings__wrapper'>
      {title && (<p className='header'>{title}</p>)}
      {content && (
      <div className={ClassNames('inner')}>{content}</div>
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

PanelSettings.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node.isRequired,
  onClose: PropTypes.func,
}

PanelSettings.defaultProps = {
  title: 'Settings',
  onClose: () => {},
}

export default memo(PanelSettings)
