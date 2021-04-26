import NumberInput from './input.number'

export default class PercentInput extends NumberInput {
  static processValue = v => (v / 100.0)
  static validateValue = (v) => {
    const numericError = NumberInput.validateValue(v)

    if (numericError) {
      return numericError
    }

    if (+v < 0) {
      return 'Must be greater than 0'
    }

    if (+v > 100) {
      return 'Must be less than 100'
    }

    return null
  }
}
