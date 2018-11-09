import PropTypes from 'prop-types'

export const propTypes = {
  onSelectMode: PropTypes.func,
  onSelectRange: PropTypes.func,
  onSelectTF: PropTypes.func,
  onSelectSymbol: PropTypes.func,
  selectedMode: PropTypes.string,
  selectedRange: PropTypes.array,
  selectedSymbol: PropTypes.string,
  selectedTF: PropTypes.string,
  symbols: PropTypes.array,
  tfs: PropTypes.array,
}

export const defaultProps = {}
