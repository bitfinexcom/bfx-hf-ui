import React from 'react'
import './style.css'

export default class Checkbox extends React.PureComponent {
  render () {
    const { label, value, onChange } = this.props

    return (
      <div className='dtc-checkbox pretty p-default'>
        <input
          className='dtc-input'
          type='checkbox'
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />

        <div className='state'>
          <label>{label}</label>
        </div>
      </div>
    )
  }
}
