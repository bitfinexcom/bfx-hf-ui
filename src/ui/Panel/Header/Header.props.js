import PropTypes from 'prop-types'

export const propTypes = {
  label: PropTypes.string,
  selectedTabIndex: PropTypes.number,
  hasSecondaryHeader: PropTypes.bool,
  hideIcons: PropTypes.bool,
  removeable: PropTypes.bool,
  moveable: PropTypes.bool,
  isSettingsOpen: PropTypes.bool,
  tabs: PropTypes.arrayOf(PropTypes.element),
  components: PropTypes.oneOfType([
    PropTypes.element, PropTypes.arrayOf(PropTypes.element),
  ]),

  extraIcons: PropTypes.oneOfType([
    PropTypes.element, PropTypes.arrayOf(PropTypes.element),
  ]),

  onClosePanel: PropTypes.func,
  onToggleSettings: PropTypes.func,
  onRemove: PropTypes.func,
  onTabClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element, PropTypes.arrayOf(PropTypes.element),
  ]),
}

export const defaultProps = {
  selectedTabIndex: 0,
  hasSecondaryHeader: false,
  hideIcons: false,
  removeable: false,
  moveable: false,
  isSettingsOpen: false,
  onClosePanel: null,
  onToggleSettings: null,
  onRemove: null,
  onTabClick: null,
}
