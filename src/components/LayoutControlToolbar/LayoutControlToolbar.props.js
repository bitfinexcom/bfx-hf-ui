import PropTypes from 'prop-types'

export const propTypes = {
  layouts: PropTypes.object,
  tradingEnabled: PropTypes.bool,
  layoutDirty: PropTypes.bool,
  activeLayout: PropTypes.object.isRequired,
  onAddLayout: PropTypes.func.isRequired,
  onDeleteLayout: PropTypes.func.isRequired,
  onSaveLayout: PropTypes.func.isRequired,
  onAddComponent: PropTypes.func.isRequired,
  onChangeLayout: PropTypes.func.isRequired,
}

export const defaultProps = {
  layouts: {},
  tradingEnabled: false,
  layoutDirty: false,
}
