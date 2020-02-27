import React from 'react'
import ClassNames from 'classnames'
import RSelect from 'react-select'
import Scrollbars from 'react-custom-scrollbars'

import { propTypes, defaultProps } from './Select.props'
import './style.css'

export default class Select extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      onChange, value, options, className, disabled, isDisabled, label,
      ...otherProps
    } = this.props

    const renderScrollbar = (props) => {
      return (
        <div style={{ height: 200 }}>
          <Scrollbars>{props.children}</Scrollbars>
        </div>
      )
    }

    return (
      <div className='hfui-select__outer'>
        {label && (
          <p>{label}</p>
        )}

        <RSelect
          className={ClassNames('hfui-select', className)}
          components={{ MenuList: renderScrollbar }}
          isDisabled={disabled || isDisabled}
          classNamePrefix='hfui-select'
          onChange={onChange}
          value={value}
          options={options}

          {...otherProps}
        />
      </div>
    )
  }
}
