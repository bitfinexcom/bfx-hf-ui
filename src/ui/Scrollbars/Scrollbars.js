import React, { memo } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Scrollbars as CustomScrollbars } from 'react-custom-scrollbars'

import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

import './style.css'

const Scrollbars = ({ children, ...rest }) => (
  <PerfectScrollbar
    options={{
      minScrollbarLength: 60,
      maxScrollbarLength: 100,
    }}
    {...rest}
  >
    {children}
  </PerfectScrollbar>
)

Scrollbars.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default memo(Scrollbars)
