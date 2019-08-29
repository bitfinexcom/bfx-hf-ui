import React from 'react'
import { propTypes, defaultProps } from './RadioButton.props'
import './style.css'

export default class RadioButton extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      onChange, value, label, id,
    } = this.props

    return (
      <div className='pretty p-default p-round dtc-radio-button'>
        <input
          className='dtc-input'
          type='radio'
          id={id}
          checked={value}
          onChange={onChange}
        />

        <div className='state'>
          <label htmlFor={id}>{label}</label>
        </div>
      </div>
    )
  }
}
