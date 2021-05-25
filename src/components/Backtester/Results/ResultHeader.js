import React, { memo } from 'react'
import PropTypes from 'prop'

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
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

ResultHeader.defaultProps = {
  value: '',
}

export default memo(ResultHeader)
