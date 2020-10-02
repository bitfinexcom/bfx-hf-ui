import React from 'react'
import DatePicker from 'react-datepicker'

import { propTypes, defaultProps } from './input.date.props'
import {
  renderString, CONVERT_LABELS_TO_PLACEHOLDERS,
} from '../OrderForm.helpers'

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
    const renderedLabel = renderString(label, renderData)

    return (
      <div className='hfui-orderform__input fullWidth hfui-input'>
        <DatePicker
          popperPlacement='bottom-start'
          dateFormat='MMMM d, yyyy h:mm aa'
          timeCaption='Time'
          timeFormat='HH:mm'
          timeIntervals={10}
          showTimeSelect
          width='100%'
          selected={value}
          onChange={onChange}
          placeholder={CONVERT_LABELS_TO_PLACEHOLDERS ? renderedLabel : undefined}
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
