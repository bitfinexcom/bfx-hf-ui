import React from 'react'
import _capitalize from 'lodash/capitalize'
import ClassNames from 'classnames'
import {
  Iceberg, TWAP, AccumulateDistribute, PingPong, MACrossover,
} from 'bfx-hf-algo'

import {
  renderLayout,
  processFieldData,
  marketToQuoteBase,
  defaultDataForLayout,
  COMPONENTS_FOR_ID,
} from './OrderForm.helpers'

import nearestMarket from '../../util/nearest_market'
import TIME_FRAMES_FOR_EXID from '../../util/time_frames'

import Panel from '../../ui/Panel'
import Select from '../../ui/Select'
import Dropdown from '../../ui/Dropdown'
import Scrollbars from '../../ui/Scrollbars'
import MarketSelect from '../MarketSelect'

import LoginModal from './Modals/LoginModal'
import LockedModal from './Modals/LockedModal'
import ConnectingModal from './Modals/ConnectingModal'
import UnconfiguredModal from './Modals/UnconfiguredModal'
import SubmitAPIKeysModal from './Modals/SubmitAPIKeysModal'
import UnlockAPIKeysModal from './Modals/UnlockAPIKeysModal'

import { propTypes, defaultProps } from './OrderForm.props'
import './style.css'

const CONTEXT_LABELS = {
  e: 'Exchange',
  m: 'Margin',
  f: 'Futures',
}

export default class OrderForm extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    fieldData: {},
    validationErrors: {},
    creationError: null,
    context: 'exchange',
    helpOpen: false,
    unlockModalOpen: false,
    configureModalOpen: false,
  }

  constructor(props) {
    super(props)

    const {
      orders = {}, savedState = {}, activeMarket, activeExchange,
    } = props

    const {
      currentExchange = activeExchange, currentMarket = activeMarket,
      exchangeDirty, marketDirty,
    } = savedState

    const algoOrders = OrderForm.getAOs(currentExchange)
    const currentOrder = orders[currentExchange][0] || algoOrders[0]

    this.state = {
      ...this.state,

      algoOrders,
      currentMarket,
      currentExchange,
      exchangeDirty,
      marketDirty,

      fieldData: defaultDataForLayout(currentOrder),
      currentLayout: currentOrder,
      context: currentMarket.c[0],
    }

    this.onChangeActiveOrderLayout = this.onChangeActiveOrderLayout.bind(this)
    this.onChangeExchange = this.onChangeExchange.bind(this)
    this.onChangeMarket = this.onChangeMarket.bind(this)
    this.onContextChange = this.onContextChange.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onToggleHelp = this.onToggleHelp.bind(this)
    this.onToggleUnlockModal = this.onToggleUnlockModal.bind(this)
    this.onToggleConfigureModal = this.onToggleConfigureModal.bind(this)
    this.onSubmitAPIKeys = this.onSubmitAPIKeys.bind(this)
    this.onUnlock = this.onUnlock.bind(this)
  }

  static getAOs(exID) {
    return [
      MACrossover,
      AccumulateDistribute,
      PingPong,
      Iceberg,
      TWAP,
    ].map(ao => ao.meta.getUIDef({
      timeframes: Object.values(TIME_FRAMES_FOR_EXID[exID]),
    }))
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeExchange, activeMarket } = nextProps
    const {
      marketDirty, currentMarket, exchangeDirty, currentExchange,
    } = prevState

    if ((marketDirty || exchangeDirty) || (
      activeMarket === currentMarket && activeExchange === currentExchange
    )) {
      return {}
    }

    const algoOrders = OrderForm.getAOs(activeExchange)
    const { orders } = nextProps
    const currentOrder = orders[activeExchange][0] || algoOrders[0]

    return {
      algoOrders,
      currentExchange: activeExchange,
      currentMarket: activeMarket,
      fieldData: defaultDataForLayout(currentOrder),
      currentLayout: currentOrder,
    }
  }

  onChangeMarket(market) {
    const { currentMarket } = this.state

    if (market.r === currentMarket.r) {
      return
    }

    this.setState(() => ({
      currentMarket: market,
      context: market.c[0],
      marketDirty: true,
    }))

    this.deferSaveState()
  }

  onUnlock({ password }) {
    const { unlockAPIKeys } = this.props
    const { currentExchange } = this.state

    unlockAPIKeys({ password, exID: currentExchange })
  }

  onSubmitAPIKeys({ apiKey, apiSecret, password }) {
    const { submitAPIKeys, user } = this.props
    const { currentExchange } = this.state

    submitAPIKeys({
      userID: user.id,
      exID: currentExchange,
      apiKey,
      apiSecret,
      password,
    })
  }

  onToggleHelp() {
    this.setState(({ helpOpen }) => ({
      helpOpen: !helpOpen,
    }))
  }

  onToggleUnlockModal() {
    this.setState(({ unlockModalOpen }) => ({
      unlockModalOpen: !unlockModalOpen,
    }))
  }

  onToggleConfigureModal() {
    this.setState(({ configureModalOpen }) => ({
      configureModalOpen: !configureModalOpen,
    }))
  }

  onContextChange(context) {
    this.setState(() => ({ context }))
  }

  onChangeActiveOrderLayout(orderLabel) {
    const { orders: allOrders } = this.props
    const { currentExchange, algoOrders } = this.state
    const orders = allOrders[currentExchange]

    let uiDef = orders.find(({ label }) => label === orderLabel)

    if (!uiDef) {
      uiDef = algoOrders.find(({ label }) => label === orderLabel)
    }

    this.setState(() => ({
      currentLayout: uiDef,
      fieldData: defaultDataForLayout(uiDef),
    }))
  }

  onFieldChange(fieldName, value) {
    this.setState(({
      fieldData,
      currentLayout,
      validationErrors,
    }) => {
      const { fields = {} } = currentLayout
      const field = fields[fieldName] || {}
      const { component } = field
      const C = COMPONENTS_FOR_ID[component]
      const validationError = (C && C.validateValue)
        ? C.validateValue(value)
        : null

      return {
        creationError: null,

        fieldData: {
          ...fieldData,
          [fieldName]: value,
        },

        validationErrors: {
          ...validationErrors,
          [fieldName]: validationError,
        },
      }
    })
  }

  onSubmit(action) {
    if (action === 'submit') {
      this.onSubmitAlgoOrder()
      return
    } if (action === 'preview') {
      // TODO:
      return
    }

    const {
      currentLayout, fieldData, context, currentExchange, currentMarket,
    } = this.state

    const { demoMode, submitOrder } = this.props

    if (demoMode) {
      return
    }

    const { generateOrder } = currentLayout
    const data = processFieldData({
      layout: currentLayout,
      fieldData,
      action,
    })

    try {
      const packet = generateOrder(data, currentMarket[currentExchange === 'bitfinex' ? 'w' : 'r'], context)
      submitOrder({ exID: currentExchange, packet })
    } catch (e) {
      this.setState(() => ({ creationError: e.message }))
    }
  }

  onSubmitAlgoOrder() {
    const { demoMode, submitAlgoOrder } = this.props

    if (demoMode) {
      return
    }

    const {
      currentExchange, currentMarket, currentLayout, fieldData, context,
    } = this.state

    const { id } = currentLayout
    const data = processFieldData({
      layout: currentLayout,
      action: 'submit',
      fieldData,
    })

    submitAlgoOrder({
      id,
      data,
      context,
      market: currentMarket,
      exID: currentExchange,
    })
  }

  onChangeExchange(option) {
    const { value: exchange } = option
    const { currentExchange, currentMarket } = this.state
    const { allMarkets } = this.props

    if (exchange === currentExchange) {
      return
    }

    const markets = allMarkets[exchange] || []
    const newMarket = nearestMarket(currentMarket, markets)

    const algoOrders = OrderForm.getAOs(exchange)
    const { orders } = this.props
    const currentOrder = orders[exchange][0] || algoOrders[0]

    this.setState(() => ({
      algoOrders,
      fieldData: defaultDataForLayout(currentOrder),
      currentLayout: currentOrder,
      currentExchange: exchange,
      currentMarket: newMarket,
      context: newMarket.c[0],
      exchangeDirty: true,
      marketDirty: true,
    }))

    this.deferSaveState()
  }

  deferSaveState() {
    setTimeout(() => {
      this.saveState()
    }, 0)
  }

  saveState() {
    const { saveState, layoutID, layoutI } = this.props
    const {
      currentExchange, currentMarket, exchangeDirty, marketDirty,
    } = this.state

    saveState(layoutID, layoutI, {
      currentExchange,
      currentMarket,
      exchangeDirty,
      marketDirty,
    })
  }

  renderExchangeDropdown() {
    const { exchangeDirty, currentExchange } = this.state
    const { exchanges, canChangeExchange } = this.props

    return (
      <Select
        key='exchange-dropdown'
        className={{ yellow: exchangeDirty }}
        onChange={this.onChangeExchange}
        disabled={!canChangeExchange}
        value={{
          label: _capitalize(currentExchange),
          value: currentExchange,
        }}

        options={exchanges.map(ex => ({
          label: _capitalize(ex),
          value: ex,
        }))}
      />
    )
  }

  renderMarketDropdown() {
    const { currentExchange, marketDirty, currentMarket } = this.state
    const { allMarkets, canChangeMarket } = this.props

    const markets = allMarkets[currentExchange] || []

    return (
      <MarketSelect
        key='market-dropdown'
        disabled={!canChangeMarket}
        className={{ yellow: marketDirty }}
        onChange={this.onChangeMarket}
        value={currentMarket}
        markets={markets}
      />
    )
  }


  render() {
    const {
      onRemove, orders, apiClientStates, user = {}, onLogin, demoMode,
      moveable = true, removeable = true, showExchange,
      showMarket,
    } = this.props

    const {
      fieldData, validationErrors, creationError, context, currentLayout,
      helpOpen, unlockModalOpen, configureModalOpen, currentExchange,
      currentMarket, algoOrders,
    } = this.state

    const apiClientState = apiClientStates[currentExchange]
    const apiClientConnected = apiClientState === 2
    const apiClientConnecting = apiClientState === 1
    const apiClientDisconnected = !apiClientState
    const keys = ((user || {}).apiKeys || {})[currentExchange] || {}
    const renderData = marketToQuoteBase(currentMarket)
    const orderOptions = [{ value: '_label', label: 'Atomic Orders' }]

    orders[currentExchange].forEach(({ label }) => orderOptions.push({
      value: label,
      label,
    }))

    if (user && user.subscription > 0) {
      if (currentExchange === 'bitfinex' || currentExchange === 'binance') {
        orderOptions.push({ value: '_label', label: 'Algorithmic Orders' })

        // NOTE: Iceberg is disabled on Binance [native iceberg support pending implementation]
        algoOrders.filter((ao) => {
          return (
            (currentExchange === 'bitfinex')
            || (currentExchange === 'binance' && ao.id !== 'bfx-iceberg')
          )
        }).forEach(({ label }) => {
          orderOptions.push({ value: label, label })
        })
      }
    }

    // NOTE: Margin trading disabled on Binance
    return (
      <Panel
        label='EXECUTE ORDER'
        className='dtc_orderform__panel'
        moveable={moveable}
        removeable={removeable}
        onRemove={onRemove}
        headerComponents={[
          showExchange && this.renderExchangeDropdown(),
          showMarket && this.renderMarketDropdown(),
        ]}

        extraIcons={(
          apiClientConnected && currentLayout && currentLayout.customHelp && (
            <i
              role='button'
              tabIndex={0}
              onClick={this.onToggleHelp}
              className={ClassNames('fas fa-question', {
                yellow: helpOpen,
              })}
            />
          )
        )}

        footer={[
          <div className='dtc-orderform__footer-lockstatus' key='lockstatus'>
            <p>{apiClientConnected ? `UNLOCKED FOR ${currentExchange.toUpperCase()}` : 'LOCKED'}</p>
            <i className={`fas fa-${apiClientConnected ? 'unlock' : 'lock'}`} />
          </div>,

          <div className='dtc-orderform__footer-connectionstatus' key='connectionstatus'>
            <span className={ClassNames('dtc-orderform__footer-statuscircle', {
              green: apiClientConnected,
              yellow: apiClientConnecting,
              red: apiClientDisconnected,
            })}
            />

            <p>
              {apiClientConnected
                ? 'CONNECTED'
                : apiClientConnecting
                  ? 'CONNECTING'
                  : 'DISCONNECTED'
              }
            </p>
          </div>,
        ]}
      >
        <div className='dtc-orderform__wrapper'>
          {!demoMode && (
            !(user || {}).id ? (
              <LoginModal onClick={onLogin} />
            ) : [
              apiClientDisconnected && !keys.key && !keys.secret && !configureModalOpen && (
                <UnconfiguredModal
                  key='unconfigured'
                  exID={currentExchange}
                  onClick={this.onToggleConfigureModal}
                />
              ),

              apiClientDisconnected && !keys.key && !keys.secret && configureModalOpen && (
                <SubmitAPIKeysModal
                  key='submit-api-keys'
                  onClose={this.onToggleConfigureModal}
                  onSubmit={this.onSubmitAPIKeys}
                  exID={currentExchange}
                />
              ),

              apiClientDisconnected && keys.key && keys.secret && !unlockModalOpen && (
                <LockedModal
                  key='locked'
                  onClick={this.onToggleUnlockModal}
                />
              ),

              apiClientDisconnected && keys.key && keys.secret && unlockModalOpen && (
                <UnlockAPIKeysModal
                  key='unlock'
                  onClose={this.onToggleUnlockModal}
                  onSubmit={this.onUnlock}
                />
              ),

              apiClientConnecting && (
                <ConnectingModal key='connecting' />
              ),
            ]
          )}

          {helpOpen && currentLayout && currentLayout.customHelp && (
            <div className='dtc-orderform__help-wrapper'>
              <Scrollbars>
                <div className='dtc-orderform__help-inner'>
                  <p className='dtc-orderform__help-title'>
                    <span className='prefix'>HELP:</span>
                    {currentLayout.label}
                    <i
                      role='button'
                      tabIndex={0}
                      onClick={this.onToggleHelp}
                      className='far fa-times-circle'
                    />
                  </p>
                  <p className='dtc-orderform__help-content'>
                    {currentLayout.customHelp}
                  </p>
                </div>
              </Scrollbars>
            </div>
          )}

          <ul className='dtc-orderform__header'>
            <li>
              <Dropdown
                label='Order Type'
                onChange={this.onChangeActiveOrderLayout}
                value={currentLayout.label}
                options={orderOptions}
              />
            </li>

            <li>
              <Dropdown
                label='Context'
                value={context}
                onChange={this.onContextChange}
                options={currentMarket.c.filter(ctx => (
                  currentExchange === 'bitfinex' || ctx !== 'm'
                )).map(ctx => ({
                  label: CONTEXT_LABELS[ctx],
                  value: ctx,
                }))}
              />
            </li>
          </ul>

          {renderLayout({
            onSubmit: this.onSubmit,
            onFieldChange: this.onFieldChange,
            layout: currentLayout,
            validationErrors,
            renderData,
            fieldData,
          })}

          {creationError && (
            <div className='dtc-orderform__creation-error'>
              <p>{creationError}</p>
            </div>
          )}
        </div>
      </Panel>
    )
  }
}
