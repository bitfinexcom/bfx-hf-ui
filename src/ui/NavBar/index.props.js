import PropTypes from 'prop-types'

export const propTypes = {
  buttons: PropTypes.object
}

export const defaultProps = {
  buttons: {
    '': {
      label: 'Trading',
      icon: 'home'
    },
    'algo-orders': {
      label: 'Algo Orders',
      icon: 'function'
    },
    'execution': {
      label: 'Execution',
      icon: 'play'
    },
    'backtesting': {
      label: 'Backtesting',
      icon: 'series-derived'
    },
    'settings': {
      label: 'Settings',
      icon: 'cog'
    }
  }
}
