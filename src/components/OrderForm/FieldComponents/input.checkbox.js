import React from 'react'
import ClassNames from 'classnames'

import { renderString } from '../OrderForm.helpers'
import Checkbox from '../../../ui/Checkbox'

export default class CheckboxInput extends React.PureComponent {
  static DEFAULT_VALUE = false

  render() {
    const {
      def = {}, renderData, value, onChange, disabled
    } = this.props

    const { label } = def

    return (
      <div className={ClassNames('dtc-orderform__input inline', {
        disabled
      })}>
        <Checkbox
          label={renderString(label, renderData)}
          onChange={onChange}
          disabled={disabled}
          value={value}
        />
      </div>
    )
  }
}
