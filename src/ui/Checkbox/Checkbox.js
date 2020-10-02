import React from 'react'
import { propTypes, defaultProps } from './Checkbox.props'
import './style.css'

export default class Checkbox extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      label, value, onChange, id, uppercase,
    } = this.props
    return (
      <div className='hfui-checkbox pretty p-default'>
        <input
          className='hfui-input'
          type='checkbox'
          checked={value}
          onChange={e => onChange(e.target.checked)}
          id={id}
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
      </div>
    )
  }
}
