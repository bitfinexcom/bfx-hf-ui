import PropTypes from 'prop-types'
import _noop from 'lodash/noop'

export const propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.element).isRequired,
  selectedTabIndex: PropTypes.number,
  onTabClick: PropTypes.func,
}

export const defaultProps = {
  selectedTabIndex: 0,
  onTabClick: _noop,
}
