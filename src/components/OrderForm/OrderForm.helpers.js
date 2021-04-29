import React from 'react'
import ClassNames from 'classnames'
import _isObject from 'lodash/isObject'
import _isBoolean from 'lodash/isBoolean'
import _capitalize from 'lodash/capitalize'
import _flatten from 'lodash/flatten'
import _forOwn from 'lodash/forOwn'

import NumberInput from './FieldComponents/input.number'
import PriceInput from './FieldComponents/input.price'
import AmountInput from './FieldComponents/input.amount'
import CheckboxInput from './FieldComponents/input.checkbox'
import RadioInput from './FieldComponents/input.radio'
import DateInput from './FieldComponents/input.date'
import PercentInput from './FieldComponents/input.percent'
import DropdownInput from './FieldComponents/input.dropdown'
import RangeInput from './FieldComponents/input.range'
import UICheckboxGroup from './FieldComponents/ui.checkboxGroup'
import Button from '../../ui/Button'

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

// Just in case we ever decide the labels are again valuable
export const CONVERT_LABELS_TO_PLACEHOLDERS = false

const marketToQuoteBase = market => ({
  QUOTE: market.quote,
  BASE: market.base,
})

const renderString = (str, renderData) => {
  const tokens = str.split(' ')

  return tokens.map((t) => {
    if (t[0] !== '$') {
      return t
    }

    const key = t.substring(1)

    return renderData[key] || ''
  }).join(' ')
}

const verifyCondition = (condition = {}, value) => {
  if (typeof condition.eq !== 'undefined') {
    return condition.eq === value
  } if (typeof condition.neq !== 'undefined') {
    return condition.neq !== value
  } if (typeof condition.gt !== 'undefined') {
    return value > condition.gt
  } if (typeof condition.gte !== 'undefined') {
    return value >= condition.gte
  } if (typeof condition.lt !== 'undefined') {
    return value < condition.lt
  } if (typeof condition.lte !== 'undefined') {
    return value <= condition.lte
  }

  console.error(`unknown condition: ${Object.keys(condition).join(', ')}`)

  return false
}

const verifyConditionsMet = (conditions = {}, fieldData = {}) => {
  const fields = Object.keys(conditions)

  for (let i = 0; i < fields.length; i += 1) {
    if (!verifyCondition(conditions[fields[i]], fieldData[fields[i]])) {
      return false
    }
  }

  return true
}

const defaultDataForLayout = (layout = {}) => {
  const { fields = {} } = layout
  const defaultData = {}

  Object.keys(fields).forEach((fieldName) => {
    const field = fields[fieldName]
    const { component, default: defaultValue } = field
    const C = COMPONENTS_FOR_ID[component] || {}

    let v = C.DEFAULT_VALUE
    if (defaultValue || defaultValue === 0) {
      v = defaultValue
    }

    defaultData[fieldName] = v
  })

  return defaultData
}
const getValidValue = val => {
  if (typeof val === 'string' && val.length > 0) {
    if (val === 'true') return true
    if (val === 'false') return false
    return val
  }
  if (typeof val === 'number') return val.toString()
  if (typeof val === 'string' && val.length === 0) return ' '

  return val || ''
}
const processFieldData = ({ action, layout = {}, fieldData = {} }) => {
  const { fields = {} } = layout
  const data = {}

  Object.keys(fieldData).forEach((fieldName) => {
    const rawValue = fieldData[fieldName]
    const C = COMPONENTS_FOR_ID[(fields[fieldName] || {}).component]

    // TODO: Move this?
    const v = action === 'sell' && fieldName === 'amount'
      ? -1 * (+rawValue)
      : rawValue

    data[fieldName] = (C && C.processValue)
      ? C.processValue(v)
      : v
  })

  return data
}

const fixComponentContext = (orderFields, market) => {
  const fields = { ...orderFields }
  const { lev } = market

  _forOwn(fields, (value, key) => {
    const { component } = value

    if (component === 'input.range') {
      fields[key].max = lev
    }
  })

  return fields
}

// Renders a single layout field component
const renderLayoutComponent = ({
  componentDef = {}, // eslint-disable-line
  validationErrors = {}, // eslint-disable-line
  renderData = {}, // eslint-disable-line
  fieldData = {}, // eslint-disable-line
  layout = {}, // eslint-disable-line
  fieldName, // eslint-disable-line
  onFieldChange, // eslint-disable-line
}) => {
  const { disabled: disabledCond, component: id } = componentDef
  const C = COMPONENTS_FOR_ID[id]

  if (!C) {
    console.error(`can't render uknown component: ${id}`)
    return null
  }

  let disabled = false

  if (_isBoolean(disabledCond)) {
    disabled = disabledCond
  } else if (_isObject(disabledCond)) {
    disabled = verifyConditionsMet(disabledCond, fieldData)
  }

  // onFieldChange is passed through for meta components
  return (
    <C
      layout={layout}
      def={componentDef}
      renderData={renderData}
      onFieldChange={onFieldChange}
      onChange={v => onFieldChange(fieldName, v)}
      value={getValidValue(fieldData[fieldName])}
      key={`${fieldName}-component`}
      id={`${fieldName}-component`}
      validationError={validationErrors[fieldName]}
      fieldData={fieldData}
      disabled={disabled}
    />
  )
}

const renderLayoutActions = ({ layout = {}, onSubmit }) => { // eslint-disable-line
  const { actions = [] } = layout
  const validActions = actions.filter(action => action !== 'preview')

  return (
    <div
      key='of-actions'
      className={ClassNames('hfui-orderform__layout-actions', {
        'single-action': validActions.length === 1,
      })}
    >
      {validActions.map(action => (
        <Button
          key={action}
          label={_capitalize(action)}
          onClick={() => onSubmit(action)}
          red={action === 'sell'}
          green={action === 'buy'}
          blue={action === 'submit'}
        />
      ))}
    </div>
  )
}

// Renders a layout field by name
const renderLayoutField = ({
  validationErrors = {},
  renderData = {},
  fieldData = {},
  onFieldChange,
  layout,
  field,
}) => {
  const { fields = {} } = layout
  const fieldDef = fields[field]

  if (!fieldDef) {
    console.error(`can't render unknown field ${field}`)
    return null
  }

  if (fieldDef.trading && !fieldDef.trading.includes(fieldData._context)) {
    return null
  }

  return renderLayoutComponent({
    componentDef: fieldDef,
    fieldName: field,
    validationErrors,
    onFieldChange,
    renderData,
    fieldData,
    layout,
  })
}

// Renders a layout section (multiple fields/rows)
const renderLayoutSection = ({
  onFieldChange, // eslint-disable-line
  validationErrors = {}, // eslint-disable-line
  renderData = {}, // eslint-disable-line
  fieldData = {}, // eslint-disable-line
  section = {}, // eslint-disable-line
  layout = {}, // eslint-disable-line
}) => {
  const {
    title, name, rows = [], fullWidth,
  } = section

  return (
    <div
      key={name}
      className={ClassNames('hfui-orderform__layout-section', {
        fullWidth,
      })}
    >
      {title && (
        <p className='hfui-orderform__layout-section-title'>{title}</p>
      )}

      <ul>
        {_flatten(rows.map((row, i) => row.map((field, rowI) => {
          if (field === null) { // spacing placeholder
            return (
              <li key={`empty-${i}-${rowI}`} /> // eslint-disable-line
            )
          }

          const fieldComponent = layout.fields[field]
          const { visible } = fieldComponent

          if (_isBoolean(visible) && !visible) {
            return null
          } if (_isObject(visible) && !verifyConditionsMet(visible, fieldData)) {
            return null
          }

          return (
            <li key={field}>
              {field && renderLayoutField({
                field,
                layout,
                fieldData,
                renderData,
                onFieldChange,
                validationErrors,
              })}
            </li>
          )
        })))}
      </ul>
    </div>
  )
}

// Renders a full order form layout
const renderLayout = ({
  validationErrors = {}, // eslint-disable-line
  renderData = {}, // eslint-disable-line
  fieldData = {}, // eslint-disable-line
  layout = {}, // eslint-disable-line
  onSubmit, // eslint-disable-line
  onFieldChange, // eslint-disable-line
}) => {
  const { label, header, sections = [] } = layout
  const html = []

  if (_isObject(header)) {
    const { component } = header

    if (component !== 'ui.checkbox_group') {
      console.error(`layout ${label} has unsupported header component: ${component}`)
    } else {
      html.push((
        <div
          className='hfui-orderform__layout-header'
          key='header-component'
        >
          {renderLayoutComponent({ // TODO: Handle field change for header
            componentDef: header,
            fieldName: null, // meta field
            validationErrors,
            onFieldChange,
            renderData,
            fieldData,
            layout,
          })}
        </div>
      ))
    }
  }

  sections.forEach((section = {}) => {
    const { visible } = section

    if (_isBoolean(visible) && !visible) {
      return
    } if (_isObject(visible) && !verifyConditionsMet(visible, fieldData)) {
      return
    }

    html.push(renderLayoutSection({
      validationErrors,
      onFieldChange,
      renderData,
      fieldData,
      section,
      layout,
    }))
  })

  html.push(renderLayoutActions({ layout, onSubmit }))

  return (
    <div className='hfui-orderform__layout' key='orderform-layout'>
      {html}
    </div>
  )
}

export {
  renderLayout,
  renderString,
  processFieldData,
  renderLayoutField,
  marketToQuoteBase,
  defaultDataForLayout,
  fixComponentContext,
  COMPONENTS_FOR_ID,
}
