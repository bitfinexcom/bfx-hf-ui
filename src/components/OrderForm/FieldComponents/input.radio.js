import React from 'react'
import ClassNames from 'classnames'

import RadioButton from '../../../ui/RadioButton'
import { renderString } from '../OrderForm.render.helpers'
import { propTypes, defaultProps } from './input.radio.props'

export default class RadioInput extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      def = {}, renderData, value, onChange, disabled, key,
    } = this.props

    const { options } = def

    return (
      <div className={ClassNames('hfui-orderform__input', {
        disabled,
      })}
      >
        {options.map(o => (
          <RadioButton
            key={o}
            id={key}
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
