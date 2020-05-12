import React from 'react'
import ClassNames from 'classnames'
import _isObject from 'lodash/isObject'
import _isBoolean from 'lodash/isBoolean'
import _capitalize from 'lodash/capitalize'
import _flatten from 'lodash/flatten'

import { COMPONENTS_FOR_ID } from './FieldComponents' // eslint-disable-line
import Button from '../../ui/Button'

const marketToQuoteBase = market => ({
  QUOTE: market.q,
  BASE: market.b,
})

const verifyCondition = (condition = {}, value) => {
  if (typeof condition.eq !== 'undefined') {
    return condition.eq === value
  } if (typeof condition.neq !== 'undefined') {
    return condition.neq !== value
  } if (condition.lt) {
    return value < condition.lt
  } if (condition.lte) {
    return value <= condition.lte
  } if (condition.gt) {
    return value > condition.gt
  } if (condition.gte) {
    return value >= condition.gte
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

    defaultData[fieldName] = defaultValue || C.DEFAULT_VALUE
  })

  return defaultData
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
      value={fieldData[fieldName]}
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
    <div className='hfui-orderform__layout'>
      {html}
    </div>
  )
}


export {
  renderLayout,
  processFieldData,
  renderLayoutField,
  marketToQuoteBase,
  defaultDataForLayout,
}
