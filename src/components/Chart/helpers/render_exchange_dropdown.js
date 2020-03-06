import PropTypes from 'prop-types'
import React from 'react'
import _capitalize from 'lodash/capitalize'

import Select from '../../../ui/Select'

const renderExchangeDropdown = ({
  onChangeExchange, currentExchange, exchangeDirty, exchanges, disabled, // eslint-disable-line
}) => (
  <Select
    key='exchange-dropdown'
    label='Exchange'
    disabled={disabled}
    className={{ yellow: exchangeDirty }}
    onChange={onChangeExchange}
    value={{
      label: _capitalize(currentExchange),
      value: currentExchange,
    }}

    options={exchanges.map(m => ({
      label: _capitalize(m),
      value: m,
    }))}
  />
)

renderExchangeDropdown.displayName = 'ExchangeDropdown'
renderExchangeDropdown.propTypes = {
  exchanges: PropTypes.arrayOf(PropTypes.string),
}

renderExchangeDropdown.defaultProps = {
  exchanges: [],
}

export default renderExchangeDropdown
