import PropTypes from 'prop-types'
import { getSortedData } from './Table.helpers'

export const propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  rowHeight: PropTypes.number,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
}

export const defaultProps = {
  data: [],
  columns: [],
  rowHeight: 22,
  headerHeight: 32,
  onRowClick: () => {},
  sortedDataPostProcessor: () => {},
  getSortedData, // NOTE: useful default
}
