import React from 'react'
import { Icon } from 'react-fa'
import PropTypes from 'prop-types'

import { getLengthAfterPoint } from './Input.helpers'
import './style.css'

class Input extends React.PureComponent {
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

  onChange(value) {
    const { percentage, onChange, max } = this.props

    if (percentage) {
      const number = Number(value)

      if (!Number.isNaN(number) && number <= max && number >= 0 && getLengthAfterPoint(value) <= 2) {
        onChange(value)
      }
    } else {
      onChange(value)
    }
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
            placeholder={this.isPlaceholderValid(placeholder) ? placeholder : null}
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
          onChange={e => this.onChange(e.target.value)}
          placeholder={this.isPlaceholderValid(placeholder) ? placeholder : null}
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

Input.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  autocomplete: PropTypes.string,
  value: PropTypes.any, // eslint-disable-line
  placeholder: PropTypes.string,
  label: PropTypes.string,
  percentage: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ])),
  min: PropTypes.number,
  max: PropTypes.number,
}

Input.defaultProps = {
  onChange: () => {},
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  style: {},
  value: '',
  placeholder: '',
  label: '',
  className: '',
  disabled: false,
  autocomplete: 'off',
  percentage: false,
}

export default Input
