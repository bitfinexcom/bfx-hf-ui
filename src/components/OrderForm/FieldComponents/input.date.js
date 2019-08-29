import React from 'react'
import DatePicker from 'react-datepicker'

import { renderString } from '../OrderForm.helpers'
import { propTypes, defaultProps } from './input.date.props'

// TODO:
export default class DateInput extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  static processValue = v => +v
  static validateValue = (v) => {
    if (`${new Date(+v)}` === 'Invalid Date') {
      return 'Invalid date'
    } if (v === '') {
      return 'Date required'
    }

    return false
  }

  render() {
    const {
      def = {}, renderData, validationError, value, onChange,
    } = this.props

    const { label } = def

    return (
      <div className='dtc-orderform__input fullWidth'>
        <DatePicker
          className='dtc-input'
          popperPlacement='bottom-start'
          dateFormat='MMMM d, yyyy h:mm aa'
          timeCaption='Time'
          timeFormat='HH:mm'
          timeIntervals={10}
          showTimeSelect

          selected={value}
          onChange={onChange}
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
