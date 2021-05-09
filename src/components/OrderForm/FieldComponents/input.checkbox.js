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
      id,
      value,
      def = {},
      onChange,
      disabled,
      renderData,
    } = this.props
    const { label, customHelp } = def

    return (
      <div
        className={ClassNames('hfui-orderform__input inline', {
          disabled,
        })}
      >
        <Checkbox
          id={id}
          uppercase
          value={!!value}
          onChange={onChange}
          disabled={disabled}
          customHelp={customHelp}
          label={renderString(label, renderData)}
        />
      </div>
    )
  }
}
