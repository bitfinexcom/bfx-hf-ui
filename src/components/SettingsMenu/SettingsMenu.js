import React, { Component } from 'react'

export default class SettingsMenu extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { pages = [], onChange, page } = this.props

    return (
      pages.map((pageItem) => {
        const { name, title } = pageItem
        return (
          <li className={page === name && 'active'} onClick={() => onChange(name)}>
            {title}
          </li>
        )
      })
    )
  }
}
