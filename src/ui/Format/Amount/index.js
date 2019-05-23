import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import _isFinite from 'lodash/isFinite'
import prepareAmount from '../../../util/precision/prepare_amount'
import './style.css'

export default class FormatAmount extends React.PureComponent {
  static propTypes = {
    v: PropTypes.number.isRequired,
  }

  static defaultProps = {
    v: 0,
  }

  render() {
    const {
      v, className, children, ...props
    } = this.props

    return (
      <span
        className={ClassNames(className, v === 0
          ? 'format-amount__be'
          : v > 0
            ? 'format-amount__buy'
            : 'format-amount__sell')}

        {...props}
      >
        {_isFinite(v) ? prepareAmount(v) : children}
      </span>
    )
  }
}
