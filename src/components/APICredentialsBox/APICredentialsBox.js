import React from 'react'
import ClassNames from 'classnames'
import _isEmpty from 'lodash/isEmpty'
import _capitalize from 'lodash/capitalize'

import { propTypes, defaultProps } from './APICredentialsBox.props'
import Button from '../../ui/Button'
import './style.css'

export default class APICredentialsBox extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { exID, user, onClear } = this.props
    const { apiKeys = {} } = user
    const credentials = apiKeys[exID]
    const configured = credentials && (
      !_isEmpty(credentials.key) && !_isEmpty(credentials.secret)
    )

    return (
      <li
        className={ClassNames('dtc-apicredentialsbox__wrapper', {
          green: configured,
          orange: !configured,
        })}
      >
        <div className='dtc-apicredentialsbox__label'>
          <p>
            {_capitalize(exID)}
            :
          </p>

          {configured ? (
            <p>Configured (encrypted)</p>
          ) : (
            <p>Not supplied</p>
          )}
        </div>

        {configured ? (
          <Button
            onClick={onClear}
            label='Clear'
            red
          />
        ) : (
          <p className='notice'>Configure in order form</p>
        )}
      </li>
    )
  }
}
