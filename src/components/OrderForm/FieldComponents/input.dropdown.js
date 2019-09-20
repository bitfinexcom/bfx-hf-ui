import React from 'react'
import ClassNames from 'classnames'

import Dropdown from '../../../ui/Dropdown'
import { renderString } from '../OrderForm.helpers'
import { propTypes, defaultProps } from './input.dropdown.props'

export default class DropdownInput extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      def = {}, renderData = {}, value, disabled, onChange, validationError,
    } = this.props

    const { label, options } = def

    return (
      <div className={ClassNames('hfui-orderform__input', {
        disabled,
        invalid: !!validationError,
      })}
      >
        <Dropdown
          value={value}
          onChange={onChange}
          options={Object.keys(options).map(opt => ({
            label: options[opt],
            value: opt,
          }))}
        />

        <p className='hfui-orderform__input-label'>
          {renderString(label, renderData)}
        </p>

        {validationError && (
          <p className='hfui-orderform__input-error-label'>
            {validationError}
          </p>
        )}
      </div>
    )
  }
}
