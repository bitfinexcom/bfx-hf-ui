import PropTypes from 'prop-types'

export const propTypes = {
  buttons: PropTypes.object,
}

export const defaultProps = {
  buttons: {
    'api-keys': {
      label: 'API keys',
      enabled: true,
      icon: 'key',
    },
  },
}
