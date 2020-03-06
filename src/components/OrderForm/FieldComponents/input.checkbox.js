import React from 'react'
import ClassNames from 'classnames'

import { renderString } from '../OrderForm.render.helpers'
import Checkbox from '../../../ui/Checkbox/Checkbox'
import { propTypes, defaultProps } from './input.checkbox.props'

export default class CheckboxInput extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static DEFAULT_VALUE = false

  render() {
    const {
      def = {}, renderData, value, onChange, disabled, id,
    } = this.props

    const { label } = def

    return (
      <div
        className={ClassNames('hfui-orderform__input inline', {
          disabled,
        })}
      >
        <Checkbox
          uppercase
          label={renderString(label, renderData)}
          onChange={onChange}
          disabled={disabled}
          value={value}
          id={id}
        />
      </div>
    )
  }
}
