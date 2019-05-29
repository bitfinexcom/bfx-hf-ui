import PropTypes from 'prop-types'

export const propTypes = {
  buttons: PropTypes.object,
}

export const defaultProps = {
  buttons: {
    '': {
      label: 'Dashboard',
      icon: 'home'
    },
    'algo-orders': {
      label: 'Algo Orders',
      icon: 'function',
    },
    strategies: {
      label: 'Strategies',
      icon: 'function',
    },
    backtesting: {
      label: 'Backtesting',
      icon: 'series-derived',
    },
    execution: {
      label: 'Execution',
      icon: 'play',
    },
    settings: {
      label: 'Settings',
      icon: 'cog',
    },
  },
}
