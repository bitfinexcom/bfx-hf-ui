import PropTypes from 'prop-types'

export const propTypes = {
  onLayoutChange: PropTypes.func.isRequired,
  layoutDef: PropTypes.object.isRequired,
  chartProps: PropTypes.object,
  bookProps: PropTypes.object,
  tradesProps: PropTypes.object,
  orderFormProps: PropTypes.object,
  ordersProps: PropTypes.object,
  onRemoveComponent: PropTypes.func.isRequired,
  layoutID: PropTypes.string.isRequired,
  darkPanels: PropTypes.bool,
  shareProps: PropTypes.object,
}

export const defaultProps = {
  chartProps: {},
  bookProps: {},
  tradesProps: {},
  orderFormProps: {},
  ordersProps: {},
  darkPanels: false,
  sharedProps: {},
}
