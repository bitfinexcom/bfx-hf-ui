import PropTypes from 'prop-types'

export const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  gaCreateStrategy: PropTypes.func,
}

export const defaultProps = {
  gaCreateStrategy: () => {},
}
