import PropTypes from 'prop-types'

export const propTypes = {
  buttons: PropTypes.object,
}

export const defaultProps = {
  buttons: {
    // '': {
    //   label: 'Dashboard',
    //   enabled: true,
    //   icon: 'home',
    // },
    'algo-orders': {
      label: 'Algo Orders',
      enabled: true,
      icon: 'function',
    },
    // strategies: {
    //   label: 'Strategies',
    //   icon: 'function',
    // },
    // backtesting: {
    //   label: 'Backtesting',
    //   icon: 'series-derived',
    // },
    // execution: {
    //   label: 'Execution',
    //   icon: 'play',
    // },
    // settings: {
    //   label: 'Settings',
    //   icon: 'cog',
    // },
  },
}
