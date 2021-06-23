import React, { memo } from 'react'
import _map from 'lodash/map'
import PropTypes from 'prop-types'

import Button from '../../../ui/Button'
import Dropdown from '../../../ui/Dropdown'

const ImportForm = ({
  updateExecutionType, executionTypes, executionType,
}) => {
  const openFile = () => { }

  return (
    <div className='hfui-backtester__executionform'>
      <div className='hfui-backtester_row'>
        <div className='hfui-backtester__flex_start'>
          <Dropdown
            value={executionType.type}
            onChange={updateExecutionType}
            options={_map(executionTypes, et => ({
              label: et.type,
              value: et.type,
            }))}
          />
        </div>
        <div className='hfui-backtester__flex_start'>
          <div>
            <Button
              onClick={openFile}
              className='hfui-backtester__flex_start hfui-backtester__start-button'
              label='Open file'
              green
            />
          </div>
          <div style={{ marginLeft: 5 }}>
            <Button
              onClick={() => { }}
              className='hfui-backtester__flex_start hfui-backtester__start-button'
              label='Start'
              green
            />
          </div>
        </div>
        <div className='hfui-backtester__flex_start' />
      </div>
    </div>
  )
}

ImportForm.propTypes = {
  updateExecutionType: PropTypes.func.isRequired,
  executionTypes: PropTypes.arrayOf(PropTypes.object),
  executionType: PropTypes.string,
}

ImportForm.defaultProps = {
  executionType: '',
  executionTypes: [{}],
}

export default memo(ImportForm)
