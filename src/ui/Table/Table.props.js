import PropTypes from 'prop-types'
import { getSortedData } from './Table.helpers'

export const propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  rowHeight: PropTypes.number,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func
}

export const defaultProps = {
  data: [],
  columns: [],
  rowHeight: 24,
  headerHeight: 24,
  onRowClick: () => {},
  sortedDataPostProcessor: () => {},
  getSortedData // NOTE: useful default
}
