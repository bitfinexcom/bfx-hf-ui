import React from 'react'

import { propTypes, defaultProps } from './Input.props'
import './style.css'

export default class Input extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    hidden: true,
  }

  constructor(props) {
    super(props)

    this.onToggleShow = this.onToggleShow.bind(this)
  }

  onToggleShow() {
    this.setState(({ hidden }) => ({ hidden: !hidden }))
  }

  state = {
    hidden: true,
  }

  constructor(props) {
    super(props)

    this.onToggleShow = this.onToggleShow.bind(this)
  }

  onToggleShow() {
    this.setState(({ hidden }) => ({ hidden: !hidden }))
  }

  render() {
    const {
      type, className, onChange, disabled, value, placeholder, label,
      autocomplete, style,
    } = this.props

    const { hidden } = this.state

    if (type === 'password') {
      return (
        <div className='hfui-input'>
          <input
            type={hidden ? 'password' : 'text'}
            placeholder={placeholder}
            className={className}
            onChange={e => onChange(e.target.value)}
            value={value}
          />
          <button
            className='field-icon'
            type='button'
            onClick={this.onToggleShow}
          >
            {hidden ? <i className='fas fa-eye' /> : <i className='fas fa-eye-slash' />}
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
          placeholder={placeholder}
          disabled={disabled}
          style={style}
          value={value}
        />
      </div>
    )
  }
}
