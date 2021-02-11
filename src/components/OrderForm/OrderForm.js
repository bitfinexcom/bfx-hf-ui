import React from 'react'
import _isEqual from 'lodash/isEqual'
import ClassNames from 'classnames'
import {
  Iceberg, TWAP, AccumulateDistribute, PingPong, MACrossover, OCOCO,
} from 'bfx-hf-algo'

import {
  renderLayout,
  processFieldData,
  marketToQuoteBase,
  defaultDataForLayout,
  COMPONENTS_FOR_ID,
} from './OrderForm.helpers'

import TIME_FRAMES_FOR_EXID from '../../util/time_frames'

import Panel from '../../ui/Panel'
import Dropdown from '../../ui/Dropdown'
import MarketSelect from '../MarketSelect'
import Scrollbars from '../../ui/Scrollbars'
import FavoriteTradingPairs from '../FavoriteTradingPairs'

import OrderFormMenu from './OrderFormMenu'
import UnconfiguredModal from './Modals/UnconfiguredModal'
import SubmitAPIKeysModal from './Modals/SubmitAPIKeysModal'

import { propTypes, defaultProps } from './OrderForm.props'
import './style.css'

const HELP_ICON_DISABLED = true // not in design
const CONTEXT_LABELS = {
  e: 'Exchange',
  m: 'Margin',
  f: 'Futures',
}

export default class OrderForm extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    context: 'e',
    fieldData: {},
    helpOpen: false,
    creationError: null,
    validationErrors: {},
    submitTS: null,
    submitDisabled: false,
    configureModalOpen: false,
  }

  constructor(props) {
    super(props)

    const { savedState = {}, activeMarket, activeExchange } = props
    const {
      marketDirty,
      exchangeDirty,
      currentMarket = activeMarket,
      currentExchange = activeExchange,
    } = savedState
    const algoOrders = OrderForm.getAOs(currentExchange)

    this.state = {
      ...this.state,

      algoOrders,
      currentMarket,
      currentExchange,
      exchangeDirty,
      marketDirty,

      fieldData: {},
      currentLayout: null,
      context: currentMarket.contexts[0],
    }

    this.onChangeActiveOrderLayout = this.onChangeActiveOrderLayout.bind(this)
    this.onChangeMarket = this.onChangeMarket.bind(this)
    this.onContextChange = this.onContextChange.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onToggleHelp = this.onToggleHelp.bind(this)
    this.onToggleConfigureModal = this.onToggleConfigureModal.bind(this)
    this.onSubmitAPIKeys = this.onSubmitAPIKeys.bind(this)
    this.onUnlock = this.onUnlock.bind(this)
    this.onClearOrderLayout = this.onClearOrderLayout.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(_isEqual(nextProps, this.props)) || !(_isEqual(this.state, nextState))
  }

  static getAOs(exID) {
    return [
      MACrossover,
      AccumulateDistribute,
      PingPong,
      Iceberg,
      TWAP,
      OCOCO,
    ].map(ao => ao.meta.getUIDef({
      timeframes: Object.values(TIME_FRAMES_FOR_EXID[exID]),
    }))
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeExchange, activeMarket } = nextProps
    const {
      marketDirty,
      currentMarket,
      exchangeDirty,
      currentExchange,
    } = prevState

    if ((marketDirty || exchangeDirty) || (
      activeMarket === currentMarket && activeExchange === currentExchange
    )) {
      return {}
    }

    const algoOrders = OrderForm.getAOs(activeExchange)

    return {
      algoOrders,
      fieldData: {},
      currentLayout: null,
      currentMarket: activeMarket,
      currentExchange: activeExchange,
      context: activeMarket.contexts[0],
    }
  }

  componentDidUpdate() {
    const { submitTS } = this.state
    const { latestFeedbackTS } = this.props

    if (submitTS && submitTS < latestFeedbackTS) {
      this.setState(() => ({ //eslint-disable-line
        submitTS: null,
        submitDisabled: false,
      }))
    }
  }

  onChangeMarket(market) {
    const { currentMarket } = this.state

    if (market.restID === currentMarket.restID) {
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
    const { submitAPIKeys, authToken } = this.props
    const { currentExchange } = this.state

    submitAPIKeys({
      authToken,
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

  onToggleConfigureModal() {
    this.setState(({ configureModalOpen }) => ({
      configureModalOpen: !configureModalOpen,
    }))
  }

  onContextChange(context) {
    this.setState(() => ({ context }))
  }

  onClearOrderLayout() {
    this.setState(() => ({
      currentLayout: null,
      fieldData: {},
    }))
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

    const { submitOrder, authToken, gaSubmitOrder } = this.props
    const { generateOrder } = currentLayout
    const data = processFieldData({
      layout: currentLayout,
      fieldData,
      action,
    })

    try {
      const packet = generateOrder(data, currentMarket[currentExchange === 'bitfinex' ? 'wsID' : 'restID'], context)
      submitOrder({
        exID: currentExchange,
        authToken,
        packet,
      })
      gaSubmitOrder()
      this.setSubmitTimestamp()
    } catch (e) {
      this.setState(() => ({ creationError: e.message }))
    }
  }

  onSubmitAlgoOrder() {
    const { submitAlgoOrder, authToken, gaSubmitAO } = this.props
    const {
      currentExchange, currentMarket, currentLayout, fieldData, context,
    } = this.state

    const { id } = currentLayout
    const data = processFieldData({
      layout: currentLayout,
      action: 'submit',
      fieldData,
    })
    gaSubmitAO()
    submitAlgoOrder({
      id,
      data,
      context,
      authToken,
      market: currentMarket,
      exID: currentExchange,
    })
    this.setSubmitTimestamp()
  }

  setSubmitTimestamp = () => {
    this.setState(() => ({
      submitTS: Date.now(),
      submitDisabled: true,
    }))
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
      orders,
      moveable,
      onRemove,
      removeable,
      allMarkets,
      showMarket,
      savePairs,
      authToken,
      activeMarket,
      favoritePairs,
      onChangeMarket,
      apiCredentials,
      activeExchange,
      apiClientStates,
    } = this.props

    const {
      context,
      helpOpen,
      fieldData,
      algoOrders,
      currentMarket,
      currentLayout,
      creationError,
      submitDisabled,
      currentExchange,
      validationErrors,
      configureModalOpen,
    } = this.state

    const apiClientState = apiClientStates[currentExchange]
    const apiClientConnected = apiClientState === 2
    const apiClientConnecting = apiClientState === 1
    const apiClientDisconnected = !apiClientState
    const apiClientConfigured = !!(apiCredentials || {})[currentExchange]
    const renderData = marketToQuoteBase(currentMarket)
    const atomicOrderTypes = []
    const algoOrderTypes = []

    orders[currentExchange].forEach(({ label, id, uiIcon }) => atomicOrderTypes.push({
      id,
      label,
      uiIcon,
    }))

    algoOrders.forEach(({ label, id, uiIcon }) => {
      algoOrderTypes.push({
        id,
        label,
        uiIcon,
      })
    })

    return (
      <>
        <FavoriteTradingPairs
          allMarkets={allMarkets}
          prevMarket={activeMarket}
          exchange={activeExchange}
          onSelect={onChangeMarket}
          favoritePairs={favoritePairs}
          savePairs={(props) => savePairs(props, authToken)}
        />
        <Panel
          key='execute-order'
          label='EXECUTE ORDER'
          className='hfui-orderform__panel'
          moveable={moveable}
          removeable={removeable}
          onRemove={onRemove}
          headerComponents={[
            showMarket && this.renderMarketDropdown(),
          ]}
          extraIcons={(
            !HELP_ICON_DISABLED && apiClientConnected && currentLayout && currentLayout.customHelp && (
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
        >
          <div key='orderform-wrapper' className='hfui-orderform__wrapper'>
            {[
              apiClientDisconnected && !apiClientConfigured && !configureModalOpen && (
                <UnconfiguredModal
                  key='unconfigured'
                  exID={currentExchange}
                  onClick={this.onToggleConfigureModal}
                />
              ),

              !apiClientConnected && !apiClientConfigured && configureModalOpen && (
                <SubmitAPIKeysModal
                  key='submit-api-keys'
                  exID={currentExchange}
                  onSubmit={this.onSubmitAPIKeys}
                  onClose={this.onToggleConfigureModal}
                  apiClientConnecting={apiClientConnecting}
                />
              ),
            ]}

            {helpOpen && currentLayout && currentLayout.customHelp && (
              <div key='overlay-wrapper' className='hfui-orderform__overlay-wrapper'>
                <Scrollbars>
                  <div className='hfui-orderform__help-inner'>
                    <p className='hfui-orderform__help-title'>
                      <span className='prefix'>HELP:</span>
                      {currentLayout.label}
                      <i
                        role='button'
                        tabIndex={0}
                        onClick={this.onToggleHelp}
                        className='far fa-times-circle'
                      />
                    </p>
                    <p className='hfui-orderform__help-content'>
                      {currentLayout.customHelp}
                    </p>
                  </div>
                </Scrollbars>
              </div>
            )}

            {!currentLayout && (
              <div key='order-form-menu' className='hfui-orderform__overlay-wrapper'>
                <Scrollbars>
                  <OrderFormMenu
                    atomicOrderTypes={atomicOrderTypes}
                    algoOrderTypes={algoOrderTypes}
                    onSelect={({ label }) => this.onChangeActiveOrderLayout(label)}
                  />
                </Scrollbars>
              </div>
            )}

            {currentLayout && [
              <div className='hfui-orderform__layout-label' key='layout-label'>
                <i
                  className='icon-back-arrow'
                  onClick={this.onClearOrderLayout}
                />
                <div className='hfui-orderform__layout-label-inner'>
                  <i className={`icon-${currentLayout.uiIcon}`} />
                  <p>{currentLayout.label}</p>
                </div>
              </div>,

              <ul className='hfui-orderform__header' key='of-header'>
                <li key='item'>
                  <Dropdown
                    icon='exchange-passive'
                    value={context}
                    key='dropdown-orderform'
                    onChange={this.onContextChange}
                    options={currentMarket.contexts.filter(ctx => (
                      currentExchange === 'bitfinex' || ctx !== 'm'
                    )).map(ctx => ({
                      label: CONTEXT_LABELS[ctx],
                      value: ctx,
                    }))}
                  />
                </li>
              </ul>,

              renderLayout({
                renderData,
                validationErrors,
                showBtnSpinner: true,
                layout: currentLayout,
                onSubmit: this.onSubmit,
                disabled: submitDisabled,
                onFieldChange: this.onFieldChange,
                fieldData: {
                  ...fieldData,
                  _context: context,
                },
              }),

              creationError && (
                <div className='hfui-orderform__creation-error' key='of-error'>
                  <p>{creationError}</p>
                </div>
              ),
            ]}
          </div>
        </Panel>
      </>
    )
  }
}
