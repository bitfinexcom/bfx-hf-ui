import React from 'react'
import { renderLayoutField } from '../OrderForm.helpers'
import { propTypes, defaultProps } from './ui.checkboxGroup.props'

export default class UICheckboxGroup extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      def = {}, layout = {}, renderData = {}, fieldData = {}, onFieldChange, id,
    } = this.props

    const { fields } = def

    return (
      <div key={id} className='hfui-orderform__checkbox-group'>
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
