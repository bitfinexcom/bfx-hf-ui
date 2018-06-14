import PropTypes from 'prop-types'

export const propTypes = {
  buttons: PropTypes.object,
}

export const defaultProps = {
  buttons: {
    'overview' : {
      label: 'Overview',
      icon: 'home',
      homepage: true
    },
    'algo-orders': {
      label: 'Algo Orders',
      icon: 'function'
    },
    'execution': {
      label: 'Executuion',
      icon: 'play'
    },
    'backtesting': {
      label: 'Backtesting',
      icon: 'series-derived'
    },
    'settings':{
      label: 'Settings',
      icon:'cog'
    }
  }
}
