import NumberInput from './input.number'
import { prepareAmount } from 'bfx-api-node-util'

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
