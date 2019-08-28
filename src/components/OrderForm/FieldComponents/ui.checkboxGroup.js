import React from 'react'
import { renderLayoutField } from '../OrderForm.helpers'

export default class UICheckboxGroup extends React.PureComponent {
  render () {
    const {
      def = {}, layout = {}, renderData = {}, fieldData = {}, onFieldChange,
    } = this.props

    const { fields } = def

    return (
      <div className='dtc-orderform__checkbox-group'>
        {fields.map(fieldName => (
          renderLayoutField({
            onFieldChange,
            renderData,
            fieldData,
            field: fieldName,
            layout,
          })
        ))}
      </div>
    )
  }
}
