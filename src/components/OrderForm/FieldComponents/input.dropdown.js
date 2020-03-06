import React from 'react'
import ClassNames from 'classnames'

import Dropdown from '../../../ui/Dropdown'
import { propTypes, defaultProps } from './input.dropdown.props'
import {
  renderString, CONVERT_LABELS_TO_PLACEHOLDERS,
} from '../OrderForm.render.helpers'

export default class DropdownInput extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      def = {}, renderData = {}, value, disabled, onChange, validationError,
    } = this.props

    const { label, options } = def
    const renderedLabel = renderString(label, renderData)

    return (
      <div className={ClassNames('hfui-orderform__input', {
        disabled,
        invalid: !!validationError,
      })}
      >
        <Dropdown
          value={value}
          onChange={onChange}
          placeholder={CONVERT_LABELS_TO_PLACEHOLDERS && renderedLabel}
          options={Object.keys(options).map(opt => ({
            label: options[opt],
            value: opt,
          }))}
        />

        {!CONVERT_LABELS_TO_PLACEHOLDERS && (
          <p className='hfui-orderform__input-label'>
            {renderedLabel}
          </p>
        )}

        {validationError && (
          <p className='hfui-orderform__input-error-label'>
            {validationError}
          </p>
        )}
      </div>
    )
  }
}
