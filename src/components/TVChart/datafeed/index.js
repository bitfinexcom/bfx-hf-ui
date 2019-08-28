import onReady from './on_ready'
import getBars from './get_bars'
import resolveSymbol from './resolve_symbol'
import searchSymbols from './search_symbols'
import subscribeBars from './subscribe_bars'
import unsubscribeBars from './unsubscribe_bars'

export default (component) => ({
  onReady: onReady(component),
  getBars: getBars(component),
  resolveSymbol: resolveSymbol(component),
  searchSymbols: searchSymbols(component),
  subscribeBars: subscribeBars(component),
  unsubscribeBars: unsubscribeBars(component),
})
