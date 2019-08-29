import React from 'react'

import { propTypes, defaultProps } from './Input.props'
import './style.css'

export default class Input extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      type, className, onChange, disabled, value, placeholder, label,
    } = this.props

    return (
      <div className='hfui-input'>
        {label && (
          <p>{label}</p>
        )}

        <input
          type={type}
          className={className}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
        />
      </div>
    )
  }
}
