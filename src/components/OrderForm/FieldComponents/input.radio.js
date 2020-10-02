import React from 'react'
import ClassNames from 'classnames'

import RadioButton from '../../../ui/RadioButton'
import { renderString } from '../OrderForm.helpers'
import { propTypes, defaultProps } from './input.radio.props'

export default class RadioInput extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      def = {}, renderData, value, onChange, disabled,
    } = this.props
    const { options } = def
    return (
      <div className={ClassNames('hfui-orderform__input', {
        disabled,
      })}
      >
        {options.map((o, i) => (
          <RadioButton
            key={i} //eslint-disable-line
            label={renderString(o, renderData)}
            value={value === o}
            onChange={() => onChange(o)}
            uppercase
          />
        ))}
      </div>
    )
  }
}
