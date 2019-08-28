import React from 'react'
import ClassNames from 'classnames'

import RadioButton from '../../../ui/RadioButton'
import { renderString } from '../OrderForm.helpers'

export default class RadioInput extends React.PureComponent {
  render () {
    const {
      def = {}, renderData, value, onChange, disabled
    } = this.props

    const { options } = def

    return (
      <div className={ClassNames('dtc-orderform__input', {
        disabled
      })}>
        {options.map(o => (
          <RadioButton
            key={o}
            label={renderString(o, renderData)}
            value={value === o}
            onChange={() => onChange(o)}
          />
        ))}
      </div>
    )
  }
}
