import React, { memo } from 'react'
import { propTypes, defaultProps } from './ResultRow.props'

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
export default memo(ResultHeader)
