import React, { memo } from 'react'
import PropTypes from 'prop-types'
import _map from 'lodash/map'

import { renderLayoutField } from '../OrderForm.helpers'

const UICheckboxGroup = memo(({
  def: { fields }, layout, renderData, fieldData, onFieldChange,
}) => (
  <div className='hfui-orderform__checkbox-group'>
    {_map(fields, fieldName => (
      renderLayoutField({
        onFieldChange,
        renderData,
        fieldData,
        field: fieldName,
        layout,
      })
    ))}
  </div>
))

UICheckboxGroup.displayName = 'UICheckboxGroup'

UICheckboxGroup.propTypes = {
  def: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.array,
  ])).isRequired,
  layout: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.object, PropTypes.array, PropTypes.number, PropTypes.func,
  ])).isRequired,
  renderData: PropTypes.shape({
    QUOTE: PropTypes.string.isRequired,
    BASE: PropTypes.string.isRequired,
  }).isRequired,
  fieldData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool, PropTypes.number, PropTypes.instanceOf(Date),
  ])).isRequired,
  onFieldChange: PropTypes.func.isRequired,
}

export default UICheckboxGroup
