import React from 'react'
import { AutoSizer, Table, Column } from 'react-virtualized'
import { defaultProps, propTypes } from './Table.props'
import { sortData } from './Table.helpers'

import 'react-virtualized/styles.css'

export default class HFTable extends React.PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  state = {
    data: [],
    seedData: null, // props data, see getDerivedStateFromProps()
    seedSortBy: null, // --||--
    seedSortDirection: null, // --||--
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { defaultSortBy, defaultSortDirection, data } = nextProps
    const seedSortingChanged = (defaultSortBy !== prevState.seedSortBy)
      || (defaultSortDirection !== prevState.seedSortDirection)

    if (data === prevState.seedData && !seedSortingChanged) {
      return null
    }

    const sortBy = (seedSortingChanged) ? defaultSortBy : prevState.sortBy
    const sortDirection = (seedSortingChanged)
      ? defaultSortDirection
      : prevState.sortDirection

    return {
      seedData: data,
      seedSortBy: defaultSortBy,
      seedSortDirection: defaultSortDirection,

      sortBy,
      sortDirection,

      data: sortData({
        data: nextProps.data,
        sortBy,
        sortDirection,
        columns: nextProps.columns,
      }, nextProps),
    }
  }

  constructor(props) {
    super(props)

    this.onSort = this.onSort.bind(this)

    this.state = {
      ...this.state,
      sortBy: props.defaultSortBy,
      sortDirection: props.defaultSortDirection,
    }
  }

  /**
   * Re-generates the sorted dataset from props if the sort parameters have
   * changed. Also defers a row height recompute.
   *
   * @param {Object} params
   */
  onSort({ sortDirection, defaultSortDirection, sortBy }) {
    const prevSortBy = this.state.sortBy
    const prevSortDirection = this.state.sortDirection
    const direction = sortDirection || defaultSortDirection

    if (prevSortBy === sortBy && prevSortDirection === direction) { // skip
      return
    }

    const stateSortSettings = {
      sortBy,
      sortDirection: direction,
    }

    this.setState(() => ({
      ...stateSortSettings,

      data: sortData({
        data: this.props.data,
        columns: this.props.columns,
        ...stateSortSettings,
      }, this.props),
    }))
  }

  render() {
    const {
      columns, onRowClick, rowHeight, headerHeight, onRowDoubleClick, maxWidth,
    } = this.props
    const { data, sortBy, sortDirection } = this.state

    return (
      <AutoSizer>
        {({ width, height }) => (
          <Table
            autoHeight={false}
            height={height}
            width={maxWidth && width > maxWidth ? maxWidth : width}

            rowHeight={rowHeight}
            rowGetter={({ index }) => data[index]}
            rowCount={data.length}
            onRowClick={onRowClick}
            onRowDoubleClick={onRowDoubleClick}
            headerHeight={headerHeight}
            disableHeader={false}

            gridStyle={{ outline: 'none' }}
            sort={this.onSort}
            sortBy={sortBy}
            sortDirection={sortDirection}
          >
            {columns.map((c = {}) => (
              <Column
                key={c.dataKey}
                {...c}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    )
  }
}
