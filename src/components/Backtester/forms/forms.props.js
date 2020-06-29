import PropTypes from 'prop-types'

export const propTypes = {
  indicators: PropTypes.array,
  updateExecutionType: PropTypes.func,
  executionTypes: PropTypes.array,
  backtestStrategy: PropTypes.func,
  executionType: PropTypes.string,
}

export const defaultProps = {
  indicators: [],
  updateExecutionType: () => {},
  executionTypes: [],
  backtestStrategy: () => {},
  executionType: 'Historical',
}
