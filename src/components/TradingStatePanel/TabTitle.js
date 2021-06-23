import React, { memo } from 'react'
import PropTypes from 'prop-types'

function TabTitle({ heading, count }) {
  return (
    <span>
      {heading}
      {count > 0 && <span className='hfui-tspanel-counter'>{count}</span>}
    </span>
  )
}

TabTitle.propTypes = {
  heading: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
}

export default memo(TabTitle)
