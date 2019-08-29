import { prepareAmount } from 'bfx-api-node-util'
import NumberInput from './input.number'

export default class AmountInput extends NumberInput {
  static processValue = v => +prepareAmount(+v)
  static validateValue = (v) => {
    const numericError = NumberInput.validateValue(v)

    if (numericError) {
      return numericError
    }

    if (+v < 0) {
      return 'Must be greater than 0'
    }

    return null
  }
}
