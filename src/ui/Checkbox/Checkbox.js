import React from 'react'
import PropTypes from 'prop-types'

import Tooltip from '../Tooltip'
import './style.css'

export default class Checkbox extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    uppercase: PropTypes.bool,
    customHelp: PropTypes.string,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    id: null,
    label: null,
    disabled: false,
    customHelp: null,
    uppercase: false,
  }

  render() {
    const {
      id,
      value,
      label,
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
