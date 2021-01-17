import React from 'react'
import FavoriteIcon from '../../ui/Icons/FavoriteIcon'

import { propTypes, defaultProps } from './FavoriteTradingPairs.props'
import './style.css'

export default class FavoriteTradingPairs extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    selectedPair: '',
  }

  onSelect(pair) {
    const {
      onSelect, prevMarket, exchange, allMarkets,
    } = this.props
    const marketsForActiveExchange = allMarkets[exchange]
    let currMarket
    for (let i = 0; i < marketsForActiveExchange.length; i++) {
      if (marketsForActiveExchange[i].uiID === pair) {
        currMarket = marketsForActiveExchange[i]
        break
      }
    }
    onSelect(exchange, currMarket, prevMarket)
    this.setState({ selectedPair: pair })
  }

  removePair(pair) {
    const { savePairs, authToken, favoritePairs = [] } = this.props
    const newFavoritePairs = favoritePairs.filter(p => p !== pair)
    this.setState({ selectedPair: null })
    savePairs(newFavoritePairs, authToken)
  }

  render() {
    const { selectedPair } = this.state
    const { favoritePairs = [] } = this.props
    const hasFavoritePairs = favoritePairs.length !== 0
    return (
      <div className='hfui-favoritepair__wrapper'>
        <div className='hfui-favoritepair__title'>FAVORITE TRADING PAIRS</div>
        { !hasFavoritePairs && (
          <div className='hfui-favoritepair__content empty'>Empty</div>
        )}
        { hasFavoritePairs && (
          <>
            <div className='hfui-favoritepair__content'>
              {
                favoritePairs.map((pair) => (
                  <div className={`hfui-favoritepair__content-item ${pair === selectedPair ? 'active' : ''}`}>
                    <div className='hfui-favoritepair__item-wrapper'>
                      <FavoriteIcon isSelected={pair === selectedPair} onClick={() => this.removePair(pair)} key={pair} />
                      <p onClick={() => this.onSelect(pair)}>{pair}</p>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className='hfui-favoritepair__content-notice'>
              <svg width='17px' height='17px' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M5.41665 6.66666H6.04165C6.15671 6.66666 6.24998 6.75994 6.24998 6.875C6.24998 6.99005 6.15671 7.08333 6.04165 7.08333H4.37498C4.25992 7.08333 4.16665 6.99005 4.16665 6.875C4.16665 6.75994 4.25992 6.66666 4.37498 6.66666H4.99998V4.58333H4.37498C4.25992 4.58333 4.16665 4.49005 4.16665 4.37499C4.16665 4.25994 4.25992 4.16666 4.37498 4.16666H5.20831C5.32337 4.16666 5.41665 4.25994 5.41665 4.37499V6.66666ZM4.99998 9.16666C2.69879 9.16666 0.833313 7.30118 0.833313 5C0.833313 2.69881 2.69879 0.833328 4.99998 0.833328C7.30117 0.833328 9.16665 2.69881 9.16665 5C9.16665 7.30118 7.30117 9.16666 4.99998 9.16666ZM4.99998 8.75C7.07105 8.75 8.74998 7.07106 8.74998 5C8.74998 2.92893 7.07105 1.24999 4.99998 1.24999C2.92891 1.24999 1.24998 2.92893 1.24998 5C1.24998 7.07106 2.92891 8.75 4.99998 8.75ZM4.79165 2.91666H5.20831C5.32337 2.91666 5.41665 3.00994 5.41665 3.12499V3.54166C5.41665 3.65672 5.32337 3.74999 5.20831 3.74999H4.79165C4.67659 3.74999 4.58331 3.65672 4.58331 3.54166V3.12499C4.58331 3.00994 4.67659 2.91666 4.79165 2.91666Z' fill='#54B361' />
              </svg>
              <p>To remove click the star</p>
            </div>
          </>
        )}
      </div>
    )
  }
}
