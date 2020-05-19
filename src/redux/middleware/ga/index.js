import ua from 'universal-analytics'
import {
  GA_CANCEL_AO, GA_PAGEVIEW, GA_CANCEL_ATOMIC_ORDER, GA_CREATE_STRATEGY, GA_SUBMIT_ATOMIC_ORDER, GA_SUBMIT_AO, GA_UPDATE_SETTINGS,
} from '../../constants/ga'

const ReactGA = ua('UA-163797164-1')

export default () => {
  return store => next => (action = {}) => {
    const { type, payload = {} } = action
    const state = store.getState()
    const { ui = {} } = state
    const { settings = {} } = ui
    const { ga } = settings

    switch (type) {
      case GA_SUBMIT_ATOMIC_ORDER: {
        if (ga) {
          ReactGA.event('atomicOrder', 'atomicOrder.submit').send()
        }
        break
      }
      case GA_UPDATE_SETTINGS: {
        if (ga) {
          ReactGA.event('settings', 'settings.update').send()
        }
        break
      }
      case GA_SUBMIT_AO: {
        if (ga) {
          ReactGA.event('ao', 'ao.submit').send()
        }
        break
      }
      case GA_CREATE_STRATEGY: {
        if (ga) {
          ReactGA.event('strategy', 'strategy.create').send()
        }
        break
      }
      case GA_CANCEL_ATOMIC_ORDER: {
        if (ga) {
          ReactGA.event('atomicOrder', 'atomicOrder.cancel').send()
        }
        break
      }
      case GA_CANCEL_AO: {
        if (ga) {
          ReactGA.event('ao', 'ao.cancel').send()
        }
        break
      }
      case GA_PAGEVIEW: {
        const { page } = payload
        if (ga) {
          ReactGA.pageview(page).send()
        }
        break
      }
      default: {
        next(action)
        break
      }
    }
  }
}
