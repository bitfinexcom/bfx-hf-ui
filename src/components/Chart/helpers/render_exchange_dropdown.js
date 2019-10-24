import React from 'react'
import _capitalize from 'lodash/capitalize'

import Select from '../../../ui/Select'

export default ({
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
