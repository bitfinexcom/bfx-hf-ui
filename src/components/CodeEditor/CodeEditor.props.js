import PropTypes from 'prop-types'

export const propTypes = {
  editorOpened: PropTypes.bool,
  code: PropTypes.string,
  toggleEditor: PropTypes.func,
}

export const defaultProps = {
  toggleEditor: () => {},
  editorOpened: false,
  code: '',
}
