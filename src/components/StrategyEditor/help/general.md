### Strategy Editor Help

The strategy editor uses the [Bitfinex Honey Framework](https://github.com/bitfinexcom/bfx-hf-strategy) internally; as such, you can find some of this documentation on the framework home page.

Strategies written using this framework must define a set of update methods, called on each tick (with either a trade or a candle), along with a set of indicators which are automatically updated on each tick. The indicators are made available to the strategy methods, and can be queried to direct trading behavior.

The following update methods are available:

* `onPriceUpdate` - called on every tick
* `onEnter` - called when no position is open
* `onUpdate` - called when any position is open
* `onUpdateLong` - called when a long position is open
* `onUpdateShort` - called when a short position is open
* `onUpdateClosing` - called when the position will be closed by an order on the current tick
* `onPositionOpen` - called when a position has been opened
* `onPositionUpdate` - called when a position has been updated
* `onPositionClose` - called when a position is open but will be closed by an open order
* `onStart` - called when strategy execution begins
* `onStop` - called when strategy execution ends

All methods have the same signature, and are expected to be constructed as the return value of a function taking `bfx-hf-strategy`, `bfx-hf-util` and `lodash` as parameters:

`({ HFS, HFU, _ }) => async (state = {}, update = {}) => { ... }`

The following utility methods are available on the `HFS` object (bfx-hf-strategy library) passed to all update handlers:

* `getTrades(state, symbol)` - returns an array of all trades for the symbol
* `getTrade(state, index, symbol)` - indexed in reverse from the current trade
* `getCandle(state, index, symbol, tf)` - indexed in reverse from the current candle
* `getCandles(state, symbol, tf)` - returns an array of all candles for the symbol & time frame
* `getLastPrice(state, symbol, tf)`
* `getPosition(state, symbol)`
* `isLong(state, symbol)` - true if in a long position on the symbol
* `isShort(state, symbol)` - true if in a short position on the symbol
* `positionPL(position, closePrice)` - calculates position P/L at the specified close price

### Guidelines

In general, strategies should operate as state machines, opening and closing positions depending on the values of the indicators & candle data. **Lodash** is provided to all methods to aid in processing candle data, along with the `bfx-hf-strategy` library itself for querying state.

#### Managing Poisitions

Within the update handlers, several async helpers are available to open/update/close positions:

* `openLongPositionMarket(state, args = {})`
* `openLongPositionLimit(state, args = {})`
* `openLongPosition(state, args = {})`
* `openShortPositionMarket(state, args = {})`
* `openShortPositionLimit(state, args = {})`
* `openShortPosition(state, args = {})`
* `openPosition(state, args = {})`
* `updateLongPositionMarket(state, args = {})`
* `updateLongPositionLimit(state, args = {})`
* `updateLongPosition(state, args = {})`
* `updateShortPositionMarket(state, args = {})`
* `updateShortPositionLimit(state, args = {})`
* `updateShortPosition(state, args = {})`
* `updatePosition(state, args = {})`
* `closePositionMarket(state, args = {})`
* `closePositionLimit(state, args = {})`
* `closePosition(state, args = {})`

The `price` and `mtsCreate` timestamp must both be provided to all update handlers, even those operating with MARKET orders, in order to record the price and timestamp during backtests.

