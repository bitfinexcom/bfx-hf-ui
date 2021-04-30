import React from 'react'
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'
import _trim from 'lodash/trim'
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

import timeFrames from '../../util/time_frames'

import Panel from '../../ui/Panel'
import Dropdown from '../../ui/Dropdown'
import Scrollbars from '../../ui/Scrollbars'
import FavoriteTradingPairs from '../FavoriteTradingPairs'
import MarketSelect from '../MarketSelect'

// import ConnectingModal from './Modals/ConnectingModal'
import UnconfiguredModal from './Modals/UnconfiguredModal'
import SubmitAPIKeysModal from './Modals/SubmitAPIKeysModal'
import OrderFormMenu from './OrderFormMenu'

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
    fieldData: {},
    validationErrors: {},
    creationError: null,
    context: 'e',
    helpOpen: false,
    configureModalOpen: false,
  }

  constructor(props) {
    super(props)

    const { savedState = {}, activeMarket } = props
    const {
      currentMarket = activeMarket,
      marketDirty,
    } = savedState

    const algoOrders = OrderForm.getAOs()

    this.state = {
      ...this.state,
      algoOrders,
      currentMarket,
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
    this.onClearOrderLayout = this.onClearOrderLayout.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(_isEqual(nextProps, this.props)) || !(_isEqual(this.state, nextState))
  }

  static getAOs() {
    return [
      MACrossover,
      AccumulateDistribute,
      PingPong,
      Iceberg,
      TWAP,
      OCOCO,
    ].map(ao => ao.meta.getUIDef({
      timeframes: Object.values(timeFrames),
    }))
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeMarket } = nextProps
    const {
      marketDirty, currentMarket,
    } = prevState

    if (marketDirty || (activeMarket === currentMarket)) {
      return {}
    }

    const algoOrders = OrderForm.getAOs()

    return {
      algoOrders,
      currentMarket: activeMarket,
      context: activeMarket.contexts[0],
      fieldData: {},
      currentLayout: null,
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

  onSubmitAPIKeys({ apiKey, apiSecret }) {
    const { submitAPIKeys, authToken, mode } = this.props
    submitAPIKeys({
      authToken,
      apiKey,
      apiSecret,
    }, mode)
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
    const { orders } = this.props
    const { algoOrders } = this.state

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
      const processedValue = _trim(value)
      const validationError = (C && C.validateValue)
        ? C.validateValue(processedValue)
        : null

      return {
        creationError: null,

        fieldData: {
          ...fieldData,
          [fieldName]: processedValue,
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
      currentLayout, fieldData, context, currentMarket,
    } = this.state

    const { submitOrder, authToken, gaSubmitOrder } = this.props
    const { generateOrder } = currentLayout
    const data = processFieldData({
      layout: currentLayout,
      fieldData,
      action,
    })

    try {
      const packet = generateOrder(data, currentMarket.wsID, context)
      submitOrder({
        authToken,
        packet,
      })
      gaSubmitOrder()
    } catch (e) {
      this.setState(() => ({ creationError: e.message }))
    }
  }

  onSubmitAlgoOrder() {
    const { submitAlgoOrder, authToken, gaSubmitAO } = this.props
    const {
      currentMarket, currentLayout, fieldData, context,
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
    })
  }

  deferSaveState() {
    setTimeout(() => {
      this.saveState()
    }, 0)
  }

  saveState() {
    const { saveState, layoutID, layoutI } = this.props
    const { currentMarket, marketDirty } = this.state

    saveState(layoutID, layoutI, {
      currentMarket,
      marketDirty,
    })
  }

  renderMarketDropdown() {
    const { marketDirty, currentMarket } = this.state
    const { markets, canChangeMarket } = this.props

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
      onRemove, orders, apiClientState, apiCredentials, moveable, removeable,
      showMarket, favoritePairs, savePairs, authToken, onChangeMarket, markets,
      activeMarket, mode, isPaperTrading,
    } = this.props

    const {
      fieldData, validationErrors, creationError, context, currentLayout,
      helpOpen, configureModalOpen, currentMarket, algoOrders,
    } = this.state

    const apiClientConnected = apiClientState === 2
    const apiClientConnecting = apiClientState === 1
    const apiClientConfigured = !_isEmpty(apiCredentials)
    const renderData = marketToQuoteBase(currentMarket)
    const atomicOrderTypes = []
    const algoOrderTypes = []

    orders.forEach(({ label, id, uiIcon }) => atomicOrderTypes.push({
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
          markets={markets}
          currentMarket={activeMarket}
          onSelect={onChangeMarket}
          savePairs={(props) => savePairs(props, authToken, mode)}
          favoritePairs={favoritePairs}
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
              !apiClientConnected && !apiClientConfigured && !configureModalOpen && (
                <UnconfiguredModal
                  key='unconfigured'
                  onClick={this.onToggleConfigureModal}
                  isPaperTrading={isPaperTrading}
                />
              ),

              !apiClientConnected && !apiClientConfigured && configureModalOpen && (
                <SubmitAPIKeysModal
                  key='submit-api-keys'
                  onClose={this.onToggleConfigureModal}
                  onSubmit={this.onSubmitAPIKeys}
                  apiClientConnecting={apiClientConnecting}
                  isPaperTrading={isPaperTrading}
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
                    options={currentMarket.contexts.map(ctx => ({
                      label: CONTEXT_LABELS[ctx],
                      value: ctx,
                    }))}
                  />
                </li>
              </ul>,

              renderLayout({
                onSubmit: this.onSubmit,
                onFieldChange: this.onFieldChange,
                layout: currentLayout,
                validationErrors,
                renderData,
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
