import React from 'react'

import Tooltip from '../Tooltip'
import { propTypes, defaultProps } from './Checkbox.props'
import './style.css'

export default class Checkbox extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      id,
      label,
      value,
      onChange,
      disabled,
      uppercase,
      customHelp,
    } = this.props

    return (
      <div className='hfui-checkbox pretty p-curve p-default'>
        <Tooltip
          tooltipContent={customHelp}
        >
          <input
            id={id}
            type='checkbox'
            checked={value}
            disabled={disabled}
            className='hfui-input'
            onChange={e => onChange(e.target.checked)}
          />
          <div className='state'>
            <label
              htmlFor={id}
              style={{
                textTransform: uppercase ? 'uppercase' : 'auto',
              }}
            >
              {label}
            </label>
          </div>
        </Tooltip>
      </div>
    )
  }
}
