import React from 'react'
import { preparePrice } from 'bfx-api-node-util'
import NumberInput from './input.number'

const PriceInput = ({ ...props }) => (
  <NumberInput {...props} />
)

PriceInput.processValue = v => +preparePrice(+v)

PriceInput.validateValue = v => {
  const numericError = NumberInput.validateValue(v)

  if (numericError) {
    return numericError
  }

  if (+v < 0) {
    return 'Must be greater than 0'
  }

  return null
}

export default PriceInput
