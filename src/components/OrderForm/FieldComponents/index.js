import NumberInput from './input.number'
import PriceInput from './input.price'
import AmountInput from './input.amount'
import CheckboxInput from './input.checkbox'
import RadioInput from './input.radio'
import DateInput from './input.date'
import PercentInput from './input.percent'
import DropdownInput from './input.dropdown'
import RangeInput from './input.range'
import UICheckboxGroup from './ui.checkboxGroup' // eslint-disable-line

const COMPONENTS_FOR_ID = {
  'ui.checkbox_group': UICheckboxGroup,
  'input.number': NumberInput,
  'input.price': PriceInput,
  'input.amount': AmountInput,
  'input.dropdown': DropdownInput,
  'input.checkbox': CheckboxInput,
  'input.percent': PercentInput,
  'input.radio': RadioInput,
  'input.date': DateInput,
  'input.range': RangeInput,
}

export {
  COMPONENTS_FOR_ID,
  NumberInput,
  PriceInput,
  AmountInput,
  CheckboxInput,
  RadioInput,
  DateInput,
  PercentInput,
  DropdownInput,
  RangeInput,
  UICheckboxGroup,
}
