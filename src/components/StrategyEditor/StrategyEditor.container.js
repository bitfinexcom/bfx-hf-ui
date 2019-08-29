import { connect } from 'react-redux'
import Debug from 'debug'
import aes from 'aes-js'
import scrypt from 'scrypt-js'
import buffer from 'scrypt-js/thirdparty/buffer'

import WSDTCActions from '../../redux/actions/ws_dtc_server'
import { getAllCandles, getUser } from '../../redux/selectors/ws_dtc_server'
import { getActiveMarket, getActiveExchange } from '../../redux/selectors/ui'

import StrategyEditor from './StrategyEditor'

const debug = Debug('dtc:c:strategy-editor:container')
const mapStateToProps = (state = {}) => ({
  activeExchange: getActiveExchange(state),
  activeMarket: getActiveMarket(state),
  candles: getAllCandles(state),
  user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
  onSave: (userID, password, strategy = {}) => {
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

      const strategyFields = Object.keys(strategy)
      const encryptedStrategy = {
        id: strategy.id,
        label: strategy.label,
      }

      strategyFields.forEach((field) => {
        if (field === 'id') {
          return
        }

        const aesCTR = new aes.ModeOfOperation.ctr(key) // eslint-disable-line
        const sectionBytes = aes.utils.utf8.toBytes(strategy[field])
        const cipherText = aes.utils.hex.fromBytes(aesCTR.encrypt(sectionBytes))

        if (field === 'label') {
          encryptedStrategy.cryptedLabel = cipherText
        } else {
          encryptedStrategy[field] = cipherText
        }
      })

      dispatch(WSDTCActions.send(['strategy.save', encryptedStrategy]))
    })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(StrategyEditor)
