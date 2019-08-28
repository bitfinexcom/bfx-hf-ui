import React from 'react'
import ClassNames from 'classnames'
import Scrollbars from 'react-custom-scrollbars'
import OnClickOutside from 'react-onclickoutside'
import './style.css'

class Dropdown extends React.Component {
  state = {
    open: false
  }

  constructor (props) {
    super(props)

    this.onToggleOpen = this.onToggleOpen.bind(this)
  }

  onToggleOpen () {
    this.setState(({ open }) => ({ open: !open }))
  }

  onSelect (value) {
    const { onChange } = this.props
    onChange(value)

    this.setState(() => ({ open: false }))
  }

  handleClickOutside () {
    this.setState(() => ({ open: false }))
  }

  render () {
    const { open } = this.state
    const {
      label, value, options, highlight, fallback, disabled, isOpen
    } = this.props

    return (
      <div className='dtc-dropdown__wrapper'>
        {label && (
          <p>{label}</p>
        )}

        <div className='dtc-dropdown__button-wrapper'>
          <div
            onClick={disabled ? () => {} : this.onToggleOpen}
            className={ClassNames('dtc-dropdown__button', {
              yellow: open || highlight,
              disabled,
            })}
          >
            <p>
              {(options.find(o => o.value === value) || {}).label || fallback || 'Select an option'}
            </p>

            <i className='fas fa-caret-down' />
          </div>

          {(open || isOpen) && (
            <ul>
              <Scrollbars autoHeight style={{ maxHeight: '300px' }}>
                {options.map(({ label, value }) => (
                  value === '_label' ? (
                    <li
                      key={label}
                      className='label'
                    >{label}</li>
                  ) : (
                    <li 
                      key={value}
                      onClick={this.onSelect.bind(this, value)}
                    >
                      {label}
                    </li>
                  )
                ))}
              </Scrollbars>
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default OnClickOutside(Dropdown)
