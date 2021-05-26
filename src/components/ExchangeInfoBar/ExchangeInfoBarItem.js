import React, { memo } from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'

const ExchangeInfoBarItem = ({
  label, value, valuePrefix, valueSuffix, dataClassName, labelClassName, text, vertical, tag: Tag,
}) => (
  <Tag className={ClassNames('hfui-exchangeinfobar__item', { text, vertical })}>
    <p className={ClassNames('hfui-exchangeinfobar__item-label', labelClassName)}>
      {label}
      :
    </p>
    <div className={ClassNames('hfui-exchangeinfobar__item-data', dataClassName)}>
      {valuePrefix}
      {typeof value === 'number' ? value.toLocaleString('en-US', { maximumFractionDigits: 8 }) : value}
      {valueSuffix}
    </div>
  </Tag>
)

ExchangeInfoBarItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
  valuePrefix: PropTypes.string,
  valueSuffix: PropTypes.string,
  dataClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  vertical: PropTypes.bool,
  tag: PropTypes.string,
  text: PropTypes.bool,
}

ExchangeInfoBarItem.defaultProps = {
  value: '',
  valuePrefix: '',
  valueSuffix: '',
  dataClassName: '',
  labelClassName: '',
  vertical: false,
  text: false,
  tag: 'li',
}

export default memo(ExchangeInfoBarItem)
