import PropTypes from 'prop-types'

export const propTypes = {
  onAddComponentToLayout: PropTypes.func,
  onCreateNewLayout: PropTypes.func,
  onChangeLayout: PropTypes.func,
  onDeleteLayout: PropTypes.func,
  onSaveLayout: PropTypes.func,
  displayLayoutControls: PropTypes.bool,
  layoutName: PropTypes.string,
  layoutNames: PropTypes.array,
  allowTradingComponents: PropTypes.bool,
  dtcConnected: PropTypes.bool,
  layoutCanDelete: PropTypes.bool,
}

export const defaultProps = {
  displayLayoutControls: true,
}
