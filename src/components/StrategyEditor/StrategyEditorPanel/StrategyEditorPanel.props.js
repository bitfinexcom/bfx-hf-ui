import PropTypes from 'prop-types'

export const propTypes = {
  onRemove: PropTypes.func,
  moveable: PropTypes.bool,
  removeable: PropTypes.bool,
  execRunning: PropTypes.bool,
  helpOpen: PropTypes.bool,
  strategyDirty: PropTypes.bool,
  strategy: PropTypes.object,
  onToggleHelp: PropTypes.func,
  onOpenSelectModal: PropTypes.func,
  onOpenCreateModal: PropTypes.func,
  onSaveStrategy: PropTypes.func,
  onBacktestStrategy: PropTypes.func,
}

export const defaultProps = {
  moveable: true,
  removeable: true,
}
