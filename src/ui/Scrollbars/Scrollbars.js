import React, { memo } from 'react'
import PropTypes from 'prop-types'
import CustomScrollbars from 'react-custom-scrollbars'

import './style.css'

const Scrollbars = ({ children }) => (
  <CustomScrollbars
    renderTrackVertical={props => (
      <div {...props} className='hfui-scrollbars-track-vertical' />
    )}
    renderThumbVertical={props => (
      <div {...props} className='hfui-scrollbars-thumb-vertical' />
    )}
  >
    {children}
  </CustomScrollbars>
)

Scrollbars.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default memo(Scrollbars)
