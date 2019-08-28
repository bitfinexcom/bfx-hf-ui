import React from 'react'
import './style.css'

export default class RadioButton extends React.PureComponent {
  render () {
    const { onChange, value, label } = this.props

    return (
      <div className='pretty p-default p-round dtc-radio-button'>
        <input
          className='dtc-input'
          type='radio'
          checked={value}
          onChange={onChange}
        />

        <div className='state'>
          <label>{label}</label>
        </div>
      </div>
    )
  }
}