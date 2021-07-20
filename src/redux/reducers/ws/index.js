import { combineReducers } from 'redux'

import auth from './auth'
import socket from './socket'
import channels from './channels'
import strategies from './strategies'
import apiClient from './api_client'
import positions from './positions'
import balances from './balances'
import orders from './orders'
import orderHistory from './order_history'
import algoOrders from './algo_orders'
import backtest from './backtest'
import favoriteTradingPairs from './favorite_pairs'
import layouts from './layouts'

export default combineReducers({
  channelData: channels,
  algoOrders,
  positions,
  balances,
  orders,
  orderHistory,
  apiClient,
  strategies,
  socket,
  auth,
  backtest,
  favoriteTradingPairs,
  layouts,
})
