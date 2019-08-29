import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import Debug from 'debug'
import aes from 'aes-js'
import scrypt from 'scrypt-js'
import buffer from 'scrypt-js/thirdparty/buffer'

import OrderForm from './OrderForm'
import UIActions from '../../redux/actions/ui'
import WSDTCActions from '../../redux/actions/ws_dtc_server'
import { getExchanges, getMarkets } from '../../redux/selectors/meta'
import { getUser, getAPIClientStates } from '../../redux/selectors/ws_dtc_server'
import {
  getComponentState, getActiveExchange, getActiveMarket,
} from '../../redux/selectors/ui'

const debug = Debug('dtc:c:order-form')

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps

  return {
    user: getUser(state),
    activeExchange: getActiveExchange(state),
    activeMarket: getActiveMarket(state),
    exchanges: getExchanges(state),
    apiClientStates: getAPIClientStates(state),
    allMarkets: getMarkets(state),
    savedState: getComponentState(state, layoutID, 'orderform', id),
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: (route) => {
    dispatch(push(route))
  },

  saveState: (layoutID, componentID, state) => {
    dispatch(UIActions.saveComponentState({
      state,
      layoutID,
      componentID,
    }))
  },

  submitOrder: ({ exID, packet }) => {
    debug('submitting order %j', packet)

    dispatch(WSDTCActions.send(['order.submit', exID, {
      symbol: packet.symbol[exID === 'bitfinex' ? 'w' : 'r'],
      ...packet,
    }]))
  },

  submitAlgoOrder: ({
    exID, id, market, context, data,
  }) => {
    debug('submitting algo order %s on %s [%s]', id, market.u, context)

    // TODO: Extract symbol resolution (r/w)
    dispatch(WSDTCActions.send(['algo_order.submit', exID, id, {
      ...data,
      _symbol: exID === 'bitfinex' ? market.w : market.r,
      _margin: context === 'm',
    }]))
  },

  submitAPIKeys: ({
    userID, exID, apiKey, apiSecret, password,
  }) => {
    const pwBuff = new buffer.SlowBuffer(password.normalize('NFKC'))
    const saltBuff = new buffer.SlowBuffer(`${userID}`.normalize('NFKC'))

    scrypt(pwBuff, saltBuff, 1024, 8, 1, 32, (error, progress, key) => {
      if (error) {
        debug('error creating encryption key: %s', error)
        return
      }

      if (!key) {
        return
      }

      const aesCTR = new aes.ModeOfOperation.ctr(key) // eslint-disable-line
      const cryptedAPIKey = aes.utils.hex.fromBytes(aesCTR.encrypt(
        aes.utils.utf8.toBytes(apiKey),
      ))

      const cryptedAPISecret = aes.utils.hex.fromBytes(aesCTR.encrypt(
        aes.utils.utf8.toBytes(apiSecret),
      ))

      const cryptedAPIControl = aes.utils.hex.fromBytes(aesCTR.encrypt(
        aes.utils.utf8.toBytes('control'),
      ))

      dispatch(WSDTCActions.send([
        'api_credentials.save',
        exID,
        cryptedAPIKey,
        cryptedAPISecret,
        cryptedAPIControl,
      ]))
    })
  },

  unlockAPIKeys: ({ exID, password }) => {
    dispatch(WSDTCActions.send([
      'api_client.spawn', exID, password,
    ]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
