import React from 'react'
import ClassNames from 'classnames'
import Scrollbars from 'react-custom-scrollbars'
import OnClickOutside from 'react-onclickoutside'

import { propTypes, defaultProps } from './Dropdown.props'
import './style.css'

class Dropdown extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    open: false,
  }

  constructor(props) {
    super(props)

    this.onToggleOpen = this.onToggleOpen.bind(this)
  }

  handleClickOutside() {
    this.setState(() => ({ open: false }))
  }

  onSelect(value) {
    const { onChange } = this.props
    onChange(value)

    this.setState(() => ({ open: false }))
  }

  onToggleOpen() {
    this.setState(({ open }) => ({ open: !open }))
  }

  render() {
    const { open } = this.state
    const {
      label, value, options, highlight, fallback, disabled, isOpen, icon,
    } = this.props

    return (
      <div className='hfui-dropdown__wrapper'>
        {label && (
          <p>{label}</p>
        )}

        <div className='hfui-dropdown__button-wrapper'>
          <div
            onClick={disabled ? () => {} : this.onToggleOpen}
            className={ClassNames('hfui-dropdown__button', {
              highlight: open || highlight,
              disabled,
            })}
          >
            {icon && (
              <i className={`icon-${icon}`} />
            )}

            <p
              className={ClassNames({
                'with-icon': icon,
              })}
            >
              {(options.find(o => o.value === value) || {}).label || fallback || 'Select an option'}
            </p>

            <i className='icon-arrow-down-passive' />
          </div>

          {(open || isOpen) && (
            <ul
              className={ClassNames({ 'with-icon': icon })}
            >
              <Scrollbars autoHeight style={{ maxHeight: '300px' }}>
                {options.map(o => (
                  o.value === '_label' ? (
                    <li
                      key={o.label}
                      className='label'
                    >
                      {o.label}
                    </li>
                  ) : (
                    <li
                      key={o.value}
                      onClick={this.onSelect.bind(this, o.value)}
                    >
                      {o.label}
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
