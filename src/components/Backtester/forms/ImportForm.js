import React from 'react'

import Button from '../../../ui/Button'
import Dropdown from '../../../ui/Dropdown'
import { propTypes, defaultProps } from './forms.props'

export default class ImportForm extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {}

  openFile = () => {
  }

  render() {
    const {
      updateExecutionType, executionTypes, executionType,
    } = this.props
    return (
      <div className='hfui-backtester__executionform'>
        <div className='hfui-backtester_row'>
          <div className='hfui-backtester__flex_start'>
            <Dropdown
              value={executionType.type}
              onChange={updateExecutionType}
              options={executionTypes.map(et => ({
                label: et.type,
                value: et.type,
              }))}
            />
          </div>
          <div className='hfui-backtester__flex_start'>
            <div>
              <Button
                onClick={() => this.openFile()}
                className='hfui-backtester__flex_start hfui-backtester__start-button'
                label='Open file'
                green
              />
            </div>
            <div style={{ marginLeft: 5 }}>
              <Button
                onClick={() => {}}
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
}
