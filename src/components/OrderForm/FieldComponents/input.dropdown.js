import React from 'react'
import ClassNames from 'classnames'

import Dropdown from '../../../ui/Dropdown'
import { renderString } from '../OrderForm.helpers'

export default class DropdownInput extends React.PureComponent {
  render () {
    const {
      def = {}, renderData = {}, value, disabled, onChange, validationError,
    } = this.props

    const { label, options } = def

    return (
       <div className={ClassNames('dtc-orderform__input', {
        disabled,
        invalid: !!validationError,
      })}>
        <Dropdown
          value={value}
          onChange={onChange}
          options={Object.keys(options).map(opt => ({
            label: options[opt],
            value: opt,
          }))}
        />

        <p className='dtc-orderform__input-label'>
          {renderString(label, renderData)}
        </p>

        {validationError && (
          <p className='dtc-orderform__input-error-label'>
            {validationError}
          </p>
        )}
      </div>
    )
  }
}
