import React from 'react'

import './style.css'
import { propTypes, defaultProps } from './Navbar.props'

export default class Navbar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      setBacktestingPage,
      backtestingPage,
      openManageData,
      manageDataOpened,
    } = this.props

    return (
      <>
        <div className='navbar'>
          <div className={`item ${backtestingPage === 'classic' ? 'active' : ''}`} onClick={() => setBacktestingPage('classic')}>Classic API</div>
          <div className={`item ${backtestingPage === 'daazar' ? 'active' : ''}`} onClick={() => setBacktestingPage('daazar')}>Daazar</div>
        </div>
        {
            (backtestingPage === 'daazar') && (
            <div
              className={`manageData ${manageDataOpened ? 'active' : ''}`}
              onClick={() => {
                openManageData()
              }}
            >
              <svg width='20' height='18' viewBox='0 0 20 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M1 4.39095V7C1 7.34362 1.85363 7.87473 3.40973 8.28423C5.13505 8.73826 7.48657 9 10 9C12.5134 9 14.8649 8.73826 16.5903 8.28423C18.1464 7.87473 19 7.34362 19 7V4.39095C17.3864 5.40254 13.9832 6 10 6C6.01684 6 2.61364 5.40254 1 4.39095ZM0 3C0 1.16677 4.43371 0 10 0C15.5663 0 20 1.16677 20 3V15C20 16.8332 15.5663 18 10 18C4.43371 18 0 16.8332 0 15V3ZM19 8.39095C17.3864 9.40254 13.9832 10 10 10C6.01684 10 2.61364 9.40254 1 8.39095V11C1 11.3436 1.85363 11.8747 3.40973 12.2842C5.13505 12.7383 7.48657 13 10 13C12.5134 13 14.8649 12.7383 16.5903 12.2842C18.1464 11.8747 19 11.3436 19 11V8.39095ZM19 12.3909C17.3864 13.4025 13.9832 14 10 14C6.01684 14 2.61364 13.4025 1 12.3909V15C1 15.3436 1.85363 15.8747 3.40973 16.2842C5.13505 16.7383 7.48657 17 10 17C12.5134 17 14.8649 16.7383 16.5903 16.2842C18.1464 15.8747 19 15.3436 19 15V12.3909ZM10 5C12.5134 5 14.8649 4.73826 16.5903 4.28423C18.1464 3.87473 19 3.34362 19 3C19 2.65638 18.1464 2.12527 16.5903 1.71577C14.8649 1.26174 12.5134 1 10 1C7.48657 1 5.13505 1.26174 3.40973 1.71577C1.85363 2.12527 1 2.65638 1 3C1 3.34362 1.85363 3.87473 3.40973 4.28423C5.13505 4.73826 7.48657 5 10 5Z' fill={manageDataOpened ? '#54B361' : 'white'} />
              </svg>
              <p>
                Manage data
              </p>
            </div>
            )
        }
      </>
    )
  }
}
