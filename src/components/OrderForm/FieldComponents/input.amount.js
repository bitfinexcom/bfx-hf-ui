import React from 'react'
import { prepareAmount } from 'bfx-api-node-util'
import NumberInput from './input.number'

const AmountInput = ({ ...props }) => (
  <NumberInput {...props} />
)

AmountInput.processValue = v => +prepareAmount(+v)

AmountInput.validateValue = v => {
  const numericError = NumberInput.validateValue(v)

  if (numericError) {
    return numericError
  }

  if (+v < 0) {
    return 'Must be greater than 0'
  }

  return null
}

export default AmountInput
