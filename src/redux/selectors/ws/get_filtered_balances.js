import _isEmpty from 'lodash/isEmpty'
import _filter from 'lodash/filter'
import { createSelector } from 'reselect'

import getAllBalances from './get_all_balances'

const getFilteredBalances = createSelector(
  getAllBalances,
  (_, activeFilter) => activeFilter,
  (balances, activeFilter) => {
    if (_isEmpty(activeFilter)) {
      return balances
    }

    const { base, quote } = activeFilter
    const filteredBalances = _filter(balances, ({ currency }) => currency === base || currency === quote)

    return filteredBalances
  },
)

export default getFilteredBalances
