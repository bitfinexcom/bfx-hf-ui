import React from 'react'
import { propTypes, defaultProps } from './Checkbox.props'
import './style.css'

export default class Checkbox extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      label, value, onChange, id,
    } = this.props

    return (
      <div className='dtc-checkbox pretty p-default'>
        <input
          className='dtc-input'
          type='checkbox'
          checked={value}
          onChange={e => onChange(e.target.checked)}
          id={id}
        />

        <div className='state'>
          <label htmlFor={id}>{label}</label>
        </div>
      </div>
    )
  }
}
