import React, { memo } from 'react'
import PropTypes from 'prop-types'

const ResultHeader = ({ label, value }) => {
  return (
    <div className='hfui-strategyeditor__results-header-item'>
      <div className='hfui-strategyeditor__results-header-item_wrapper'>
        <p>{label}</p>
        <h4><b>{value}</b></h4>
      </div>
    </div>
  )
}

ResultHeader.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
}

export default memo(ResultHeader)
