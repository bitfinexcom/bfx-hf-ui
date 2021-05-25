import React, { memo } from 'react'

const ResultRow = ({ label, value }) => {
  return (
    <li className='hfui-strategyeditor__results-list-item'>
      <p className='hfui-strategyeditor__results-label'>{label}</p>
      <p className='hfui-strategyeditor__results-value'>{value}</p>
    </li>
  )
}

export default memo(ResultRow)
