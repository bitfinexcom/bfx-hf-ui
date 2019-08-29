import React from 'react'
import ClassNames from 'classnames'

import { renderString } from '../OrderForm.helpers'
import Checkbox from '../../../ui/Checkbox/Checkbox'
import { propTypes, defaultProps } from './input.checkbox.props'

export default class CheckboxInput extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static DEFAULT_VALUE = false

  render() {
    const {
      def = {}, renderData, value, onChange, disabled, key,
    } = this.props

    const { label } = def

    return (
      <div className={ClassNames('dtc-orderform__input inline', {
        disabled,
      })}
      >
        <Checkbox
          label={renderString(label, renderData)}
          onChange={onChange}
          disabled={disabled}
          value={value}
          id={key}
        />
      </div>
    )
  }
}
