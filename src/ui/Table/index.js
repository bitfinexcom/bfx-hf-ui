import React from 'react'
import { AutoSizer, Table, Column } from 'react-virtualized'
import { defaultProps, propTypes } from './Table.props'
import { sortData } from './Table.helpers'

import 'react-virtualized/styles.css'
import './style.css'

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
   * @param {object} params - parameters
   * @param {string} params.sortDirection - sort direction, 'ASC' or other
   * @param {string} params.defaultSortDirection - fallback, as `sortDirection`
   * @param {string} params.sortBy - key to sort data by
   */
  onSort({ sortDirection, defaultSortDirection, sortBy }) {
    const { data, columns } = this.props
    const {
      sortBy: prevSortBy,
      sortDirection: prevSortDirection,
    } = this.state

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
        data,
        columns,
        ...stateSortSettings,
      }, this.props),
    }))
  }

  render() {
    const {
      columns, onRowClick, rowHeight, headerHeight,
    } = this.props

    const {
      data, sortBy, sortDirection, scrollTop,
    } = this.state

    return (
      <div className='hfui-table'>
        <AutoSizer>
          {({ width, height }) => (
            <Table
              height={height}
              width={width}

              rowHeight={rowHeight}
              rowGetter={({ index }) => data[index]}
              rowCount={data.length}
              onRowClick={onRowClick}

              headerHeight={headerHeight}
              disableHeader={false}

              gridStyle={{ outline: 'none' }}
              sort={this.onSort}
              sortBy={sortBy}
              sortDirection={sortDirection}
              scrollTop={scrollTop}
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
      </div>
    )
  }
}
