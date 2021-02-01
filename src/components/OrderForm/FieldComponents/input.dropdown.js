import React from 'react'
import ClassNames from 'classnames'

import Tooltip from '../../../ui/Tooltip'
import Dropdown from '../../../ui/Dropdown'
import { propTypes, defaultProps } from './input.dropdown.props'
import { renderString, CONVERT_LABELS_TO_PLACEHOLDERS } from '../OrderForm.helpers'

export default class DropdownInput extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      value,
      disabled,
      onChange,
      def = {},
      validationError,
      renderData = {},
    } = this.props
    const { label, options, customHelp } = def
    const renderedLabel = renderString(label, renderData)

    return (
      <div className={ClassNames('hfui-orderform__input', {
        disabled,
        invalid: !!validationError,
      })}
      >
        <Dropdown
          value={value}
          onChange={onChange}
          placeholder={CONVERT_LABELS_TO_PLACEHOLDERS ? renderedLabel : undefined}
          options={Object.keys(options).map(opt => ({
            label: options[opt],
            value: opt,
          }))}
        />

        {!CONVERT_LABELS_TO_PLACEHOLDERS && (
          <p className='hfui-orderform__input-label'>
              {renderedLabel}
            {customHelp && (
              <Tooltip tooltipContent={customHelp}>
                <i className='fa fa-info-circle' />
              </Tooltip>
            )}
          </p>
        )}

        {validationError && (
          <p className='hfui-orderform__input-error-label'>
            {validationError}
          </p>
        )}
      </div>
    )
  }
}
