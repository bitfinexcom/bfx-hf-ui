import React from 'react'
import ClassNames from 'classnames'
import { propTypes, defaultProps } from './HeaderTabs.props'

class HeaderTabs extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { tabs, selectedTabIndex, onTabClick } = this.props
    const tabTitles = tabs.map(({ props: { tabtitle } }) => tabtitle)

    return (
      <ul className='hfui-panel__header-tabs'>
        {tabTitles.map((title, i) => (
          <li
            key={title}
            onClick={() => onTabClick(i)}
            className={ClassNames({ active: i === selectedTabIndex })}
          >
            <p className='hfui-panel__label'>{title}</p>
          </li>
        ))}
      </ul>
    )
  }
}

export default HeaderTabs
