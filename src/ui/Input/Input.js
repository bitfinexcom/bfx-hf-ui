import React from 'react'
import { Icon } from 'react-fa'

import { propTypes, defaultProps } from './Input.props'
import './style.css'

export default class Input extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  constructor(props) {
    super(props)

    this.state = {
      hidden: true,
    }
  }
  isPlaceholderValid(placeholder) { // eslint-disable-line
    return typeof placeholder !== 'boolean' || typeof placeholder === 'undefined'
  }
  toggleShow() {
    this.setState(({ hidden }) => ({ hidden: !hidden }))
  }

  render() {
    const {
      type, className, onChange, disabled, value, placeholder, label,
      autocomplete, style, min, max,
    } = this.props

    const { hidden } = this.state
    if (type === 'password') {
      return (
        <div className='hfui-input'>
          <input
            type={hidden ? 'password' : 'text'}
            placeholder={this.isPlaceholderValid(placeholder) ? placeholder : 'undefined'}
            className={className}
            onChange={e => onChange(e.target.value)}
            value={value}
          />
          <button
            className='field-icon'
            type='button'
            onClick={() => this.toggleShow()}
          >
            {hidden ? <Icon name='eye' /> : <Icon name='eye-slash' />}
          </button>
        </div>
      )
    }
    return (
      <div className='hfui-input'>
        {label && (
          <p>{label}</p>
        )}

        <input
          type={type}
          autoComplete={autocomplete}
          className={className}
          onChange={e => onChange(e.target.value)}
          placeholder={this.isPlaceholderValid(placeholder) ? placeholder : 'undefined'}
          disabled={disabled}
          style={style}
          value={value}
          min={min}
          max={max}
        />
      </div>
    )
  }
}
