import NumberInput from './input.number'

export default class PercentInput extends NumberInput {
  static processValue = v => (v / 100.0)
  static validateValue = (v) => {
    return NumberInput.validateValue(v)
  }
}
