import React, { memo } from 'react'
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'

import { renderString, CONVERT_LABELS_TO_PLACEHOLDERS } from '../OrderForm.helpers'

const DateInput = memo(({
  value, minDate, maxDate, onChange, def, renderData, validationError,
}) => {
  const { label, minDate: MIN_DATE } = def
  const renderedLabel = renderString(label, renderData)
  return (
    <div className='hfui-orderform__input fullWidth hfui-input'>
      <DatePicker
        width='100%'
        popperPlacement='bottom-start'
        dateFormat='MMMM d, yyyy h:mm aa'
        timeCaption='Time'
        timeFormat='HH:mm'
        dropdownMode='select'
        showTimeSelect
        showYearDropdown
        showMonthDropdown
        timeIntervals={10}
        selected={value}
        minDate={MIN_DATE || minDate}
        maxDate={maxDate}
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
})

DateInput.processValue = v => +v

DateInput.validateValue = v => {
  if (`${new Date(+v)}` === 'Invalid Date') {
    return 'Invalid date'
  } if (v === '') {
    return 'Date required'
  }

  return false
}

DateInput.propTypes = {
  def: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.instanceOf(Date),
  ])),
  renderData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.number, PropTypes.bool,
  ])),
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  validationError: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool,
  ]),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
}

DateInput.defaultProps = {
  minDate: new Date('01-01-2009'),
  maxDate: null,
  renderData: {},
  validationError: '',
  value: new Date(),
  def: {},
}

export default DateInput
