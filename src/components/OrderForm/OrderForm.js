import React from 'react'
import { Icon } from 'react-fa'
import _isEqual from 'lodash/isEqual'
import _isEmpty from 'lodash/isEmpty'
import _isString from 'lodash/isString'
import _map from 'lodash/map'
import _trim from 'lodash/trim'
import PropTypes from 'prop-types'
import {
  Iceberg, TWAP, AccumulateDistribute, PingPong, MACrossover, OCOCO,
} from 'bfx-hf-algo'
import Debug from 'debug'

import {
  renderLayout,
  processFieldData,
  marketToQuoteBase,
  defaultDataForLayout,
  fixComponentContext,
  COMPONENTS_FOR_ID,
} from './OrderForm.helpers'

import timeFrames from '../../util/time_frames'

import Panel from '../../ui/Panel'

import UnconfiguredModal from './Modals/UnconfiguredModal'
import SubmitAPIKeysModal from './Modals/SubmitAPIKeysModal'
import OrderFormMenu from './OrderFormMenu'

import './style.css'

const debug = Debug('hfui:order-form')

const CONTEXT_LABELS = {
  e: 'Exchange',
  m: 'Margin',
  f: 'Derivatives',
}

class OrderForm extends React.Component {
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

    const { savedState, activeMarket } = props
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
    const { algoOrders, currentMarket } = this.state

    let uiDef = orders.find(({ label }) => label === orderLabel)

    if (!uiDef) {
      uiDef = algoOrders.find(({ label }) => label === orderLabel)
    }

    uiDef.fields = fixComponentContext(uiDef.fields, currentMarket)

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
      if (field.disabled) {
        return null
      }
      const { component } = field
      const C = COMPONENTS_FOR_ID[component]
      let processedValue = value

      if (_isString(value)) {
        processedValue = _trim(value)
      }

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
    const { setIsOrderExecuting, isOrderExecuting } = this.props
    if (isOrderExecuting) {
      return
    }
    setIsOrderExecuting(true)

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
      setIsOrderExecuting(false)
      this.setState(() => ({ creationError: e.message }))
    }
  }

  onSubmitAlgoOrder() {
    const {
      submitAlgoOrder, authToken, gaSubmitAO, setIsOrderExecuting,
    } = this.props
    const {
      currentMarket, currentLayout, fieldData, context,
    } = this.state

    const { id } = currentLayout
    const data = processFieldData({
      layout: currentLayout,
      action: 'submit',
      fieldData,
    })
    const errors = this.validateAOData(data)

    if (_isEmpty(errors)) {
      gaSubmitAO()
      submitAlgoOrder({
        id,
        data,
        context,
        authToken,
        market: currentMarket,
      })
    } else {
      setIsOrderExecuting(false)
      const { field, message } = errors
      this.setState(({ validationErrors }) => ({
        validationErrors: {
          ...validationErrors,
          [field]: message,
        },
      }))
    }
  }

  validateAOData(data) {
    const { currentLayout } = this.state
    let errors = {}

    switch (currentLayout.id) {
      case Iceberg.id: {
        const processedData = Iceberg.meta.processParams(data)
        errors = Iceberg.meta.validateParams(processedData)
        break
      }

      case TWAP.id: {
        const processedData = TWAP.meta.processParams(data)
        errors = TWAP.meta.validateParams(processedData)
        break
      }

      case AccumulateDistribute.id: {
        const processedData = AccumulateDistribute.meta.processParams(data)
        errors = AccumulateDistribute.meta.validateParams(processedData)
        break
      }

      case PingPong.id: {
        const processedData = PingPong.meta.processParams(data)
        errors = PingPong.meta.validateParams(processedData)
        break
      }

      case MACrossover.id: {
        const processedData = MACrossover.meta.processParams(data)
        errors = MACrossover.meta.validateParams(processedData)
        break
      }

      case OCOCO.id: {
        const processedData = OCOCO.meta.processParams(data)
        errors = OCOCO.meta.validateParams(processedData)
        break
      }

      default:
        debug('unknown layout %s', currentLayout.id)
    }

    return errors
  }

  deferSaveState() {
    setTimeout(() => {
      this.saveState()
    }, 0)
  }

  saveState() {
    const { saveState, layoutI } = this.props
    const { currentMarket, marketDirty } = this.state

    saveState(layoutI, {
      currentMarket,
      marketDirty,
    })
  }

  render() {
    const {
      onRemove, orders, apiClientState, apiCredentials, moveable, removeable, isPaperTrading, isOrderExecuting,
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
        <Panel
          key='execute-order'
          darkHeader
          dark
          label='Execute Order'
          className='hfui-orderform__panel'
          moveable={moveable}
          removeable={removeable}
          onRemove={onRemove}
          extraIcons={(
            !helpOpen && apiClientConnected && currentLayout && currentLayout.customHelp && (
              <Icon
                name='question'
                onClick={this.onToggleHelp}
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
                <div className='hfui-orderform__help-inner'>
                  <p className='hfui-orderform__help-title'>
                    <span className='prefix'>HELP:</span>
                    {currentLayout.label}
                    <i
                      role='button'
                      tabIndex={0}
                      onClick={this.onToggleHelp}
                      className='hfui-orderform__question-btn icon-cancel'
                    />
                  </p>
                  <p className='hfui-orderform__help-content'>
                    {currentLayout.customHelp}
                  </p>
                </div>
              </div>
            )}

            {!currentLayout && apiClientConfigured && (
              <div key='order-form-menu' className='hfui-orderform__overlay-wrapper'>
                <OrderFormMenu
                  atomicOrderTypes={atomicOrderTypes}
                  algoOrderTypes={algoOrderTypes}
                  onSelect={({ label }) => this.onChangeActiveOrderLayout(label)}
                />
              </div>
            )}

            {!helpOpen && currentLayout && [
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
                <li key='item' className='hfui-orderform__centered-item'>
                  {_map(currentMarket.contexts, value => (
                    <div key={value} onClick={() => this.onContextChange(value)} className={`hfui__orderform-tab ${value === context ? 'active' : ''}`}>
                      <p>{CONTEXT_LABELS[value]}</p>
                    </div>
                  ))}
                </li>
              </ul>,

              renderLayout({
                onSubmit: this.onSubmit,
                onFieldChange: this.onFieldChange,
                layout: currentLayout,
                validationErrors,
                renderData,
                isOrderExecuting,
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

OrderForm.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  savedState: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool, PropTypes.object,
  ])).isRequired,
  activeMarket: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ])).isRequired,
  apiClientState: PropTypes.number.isRequired,
  apiCredentials: PropTypes.objectOf(PropTypes.bool).isRequired,
  setIsOrderExecuting: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  submitAPIKeys: PropTypes.func.isRequired,
  submitOrder: PropTypes.func.isRequired,
  gaSubmitOrder: PropTypes.func.isRequired,
  submitAlgoOrder: PropTypes.func.isRequired,
  gaSubmitAO: PropTypes.func.isRequired,
  saveState: PropTypes.func.isRequired,
  isPaperTrading: PropTypes.bool.isRequired,
  layoutI: PropTypes.string,
  authToken: PropTypes.string,
  onRemove: PropTypes.func,
  isOrderExecuting: PropTypes.bool,
  moveable: PropTypes.bool,
  removeable: PropTypes.bool,
}

OrderForm.defaultProps = {
  moveable: true,
  removeable: true,
  isOrderExecuting: false,
  onRemove: () => { },
  authToken: null,
  layoutI: 'orderform',
}

export default OrderForm
