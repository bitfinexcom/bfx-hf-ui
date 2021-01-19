import PropTypes from 'prop-types'

export const propTypes = {
  tagName: PropTypes.string,
  placement: PropTypes.string,
  tooltipContent: PropTypes.node,
  children: PropTypes.node.isRequired,
}

export const defaultProps = {
  tagName: 'span',
  placement: 'auto',
  tooltipContent: null,
}
