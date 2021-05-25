import React, { memo } from 'react'
import PropTypes from 'prop-types'

const ResultRow = ({ label, value }) => {
  return (
    <li className='hfui-strategyeditor__results-list-item'>
      <p className='hfui-strategyeditor__results-label'>{label}</p>
      <p className='hfui-strategyeditor__results-value'>{value}</p>
    </li>
  )
}

ResultRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
}

export default memo(ResultRow)
