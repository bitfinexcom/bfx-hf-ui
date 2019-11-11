import { combineReducers } from 'redux'

import auth from './auth'
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
import notifications from './notifications'

export default combineReducers({
  channelData: channels,
  notifications,
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
  auth,
})
