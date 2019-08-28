import { combineReducers } from 'redux'

import user from './user'
import books from './books'
import socket from './socket'
import trades from './trades'
import tickers from './tickers'
import candles from './candles'
import channels from './channels'
import strategies from './strategies'
import apiClients from './api_clients'
import positions from './positions'
import balances from './balances'
import orders from './orders'
import algoOrders from './algo_orders'
import indicatorValues from './indicator_values'

export default combineReducers({
  indicatorValues,
  channelData: channels,
  algoOrders,
  positions,
  balances,
  orders,
  apiClients,
  strategies,
  tickers,
  candles,
  trades,
  socket,
  books,
  user,
})
