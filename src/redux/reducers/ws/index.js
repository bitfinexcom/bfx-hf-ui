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
import orderHistory from './order_history'
import algoOrders from './algo_orders'
import backtest from './backtest'

export default combineReducers({
  channelData: channels,
  algoOrders,
  positions,
  balances,
  orders,
  orderHistory,
  apiClients,
  strategies,
  tickers,
  candles,
  trades,
  socket,
  books,
  auth,
  backtest,
})
