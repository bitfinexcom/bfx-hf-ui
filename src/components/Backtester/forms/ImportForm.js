import React from 'react'

import Button from '../../../ui/Button'
import Dropdown from '../../../ui/Dropdown'
import { propTypes, defaultProps } from './forms.props'

// const { dialog } = require('electron')


export default class ImportForm extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {}

  openFile = () => {
    // dialog.showOpenDialog({ properties: ['openFile'] })
  }

  render() {
    const {
      updateExecutionType, executionTypes, executionType,
    } = this.props
    return (
      <div className='hfui-backtester__executionform'>
        <div className='hfui-backtester_row'>
          <div className='input-label hfui-backtester__flex_start'>
            <div>
              <Dropdown
                value={executionType.type}
                onChange={updateExecutionType}
                options={executionTypes.map(et => ({
                  label: et.type,
                  value: et.type,
                }))}
              />
              <p className='hfui-orderform__input-label'>Execution type</p>
            </div>
          </div>
          <div className='hfui-backtester__flex_start'>
            <Button
              onClick={() => this.openFile}
              className='hfui-backtester__flex_start'
              // disabled={false}
              label='Open file'
              green
            />
          </div>
          <div className='hfui-backtester__flex_start'>
            <Button
              onClick={() => {}}
              className='hfui-backtester__flex_start'
              // disabled={false}
              label='Start'
              green
            />
          </div>
        </div>
      </div>
    )
  }
}
