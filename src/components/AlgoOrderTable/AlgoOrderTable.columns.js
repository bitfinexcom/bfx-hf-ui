export default [{
  width: 200,
  label: 'Created',
  dataKey: 'mts',
  cellRenderer: ({ rowData = {} }) => (
    new Date(rowData.mts).toLocaleString()
  ),
}, {
  width: 80,
  label: 'Symbol',
  dataKey: 'symbol',
  cellRenderer: ({ rowData = {} }) => rowData.symbol,
}]
