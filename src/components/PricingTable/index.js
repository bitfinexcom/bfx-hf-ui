import React from 'react'

import Button from '../../ui/Button'
import FeatureLabel from './FeatureLabel'
import './style.css'

export default class PricingTable extends React.PureComponent {
  render () {
    const { user, onRegister, navigate } = this.props

    return (
      <div className='dtc-pricingtable__wrapper'>
        <h3 className='center'>Pricing</h3>
        <p>Datsusara Crypto is still under active development; as such, not all features listed below are currently available. Features currently under development are marked with an asterisk *.</p>
        <br />
        <p className='bold'>Due to this, prices are currently reduced by 50% until development of the base feature set is complete. Users that subscribe to a paid plan now will be charged the development price for life.</p>

        <div className='dtc-pricingtable__columns'>
          <ul className='dtc-pricingtable__column'>
            <li className='header'></li>
            <FeatureLabel
              id='layouts'
              label='Layouts'
              tooltip='The # of layouts that can be configured. For multi-monitor setups, use a different layout for each monitor'
            />

            <FeatureLabel
              id='charts-per-layout'
              label='Charts per Layout'
              tooltip='The # of charts that can be configured on each individual layout'
            />

            <FeatureLabel
              id='indicators-per-chart'
              label='Indicators per Chart'
              tooltip='The # of indicators that can be added to a single chart.'
            />

            <FeatureLabel
              dev
              id='custom-indicators'
              label='Custom Indicators *'
              tooltip='Access to a system for developing &amp; marketing custom trading indicators, for usage in both strategies &amp; charts.'
            />
            <li className='empty'></li>
            <FeatureLabel
              id='backtesting'
              label='Strategy Backtesting'
              tooltip='Develop strategies with the strategy editor &amp; backtest them on historical data from all integrated exchanges.'
            />

            <FeatureLabel
              dev
              id='strat-execution'
              label='Strategy Execution *'
              tooltip='Run your strategies on our servers across any of the integrated exchanges, leveraging our infrastructure. No need to run your own Honey Framework server.'
            />
            <li className='empty'></li>
            <FeatureLabel
              id='ao'
              label='Algorithmic Orders'
              tooltip='Execute algorithmic orders on any of the integrated exchanges, leveraging our infrastructure. No need to run your own Honey Framework server.'
            />

            <FeatureLabel
              dev
              id='vps'
              label='Automatic VPS Provisioning *'
              tooltip='Automatically deploy a Virtual Private Server using our interface for strategy execution. If our encryption is not enough for you, you can run your strategies on your own server, automatically deployed by our provisioning system'
            />
            <li className='empty'></li>
            <FeatureLabel
              dev
              id='strat-market'
              label='Strategy Marketplace *'
              tooltip='Access to a marketplace for buying &amp; selling strategy trading signals. Offer your strategy on the market for others, or automatically copy-trade using signals from strategies offered by others.'
            />

            <FeatureLabel
              dev
              id='indicator-market'
              label='Indicator Marketplace *'
              tooltip='Access to a marketplace for buying &amp; selling custom trading indicators, for usage in both strategies &amp; charts.'
            />
            <li className='empty'></li>
            <FeatureLabel
              dev
              id='price-alerts'
              label='Price Alerts *'
              tooltip='Configure alerts to be notified when markets reach a specific price'
            />

            <FeatureLabel
              dev
              id='sms-alerts'
              label='SMS Alerts *'
              tooltip='Receive price &amp; order alerts by SMS'
            />
            <li className='empty'></li>
            <FeatureLabel
              dev
              id='perf'
              label='Performance Analysis *'
              tooltip='Import your historical trading data and analyze your performance across multiple exchanges. View your net profit/loss, historical exposure, and each individual movement on our charts.'
            />
            <li className='empty'></li>
            <FeatureLabel
              dev
              id='api'
              label='API Integration *'
              tooltip='Integrate with our API to execute atomic &amp; algorithmic orders, or execute strategies progamatically.'
            />

            <FeatureLabel
              id='support'
              label='Priority Support'
              tooltip='Access to a private Telegram support channel with the developer of Datsusara Crypto'
            />

            <FeatureLabel
              id='beta'
              label='Access to BETA Features'
              tooltip='Utilize in-development features prior to official release'
            />
            <li className='dev price'>Full Price</li>
            <li className='price'>Development Price</li>
          </ul>

          <ul className='dtc-pricingtable__column'>
            <li className='header'>Free</li>
            <li>1</li>
            <li>1</li>
            <li>3</li>
            <li></li>
            <li className='empty'></li>
            <li><i className='fas fa-check' /></li>
            <li></li>
            <li className='empty'></li>
            <li></li>
            <li></li>
            <li className='empty'></li>
            <li></li>
            <li></li>
            <li className='empty'></li>
            <li>2</li>
            <li></li>
            <li className='empty'></li>
            <li></li>
            <li className='empty'></li>
            <li></li>
            <li></li>
            <li></li>
            <li className='dev price'>Free</li>
            <li className='price'>Free</li>

            {user && user.id && (
              <li className='button'>
                <Button
                  disabled={!user.subscription}
                  label={!user.subscription ? 'Current Plan' : 'Cancel Subscription' }
                  red={!!user.subscription}
                  onClick={!user.subscription
                    ? () => {}
                    : () => navigate('/account')
                  }
                />
              </li>
            )}
          </ul>

          <ul className='dtc-pricingtable__column'>
            <li className='header'>Basic</li>
            <li>3</li>
            <li>3</li>
            <li>5</li>
            <li></li>
            <li className='empty'></li>
            <li><i className='fas fa-check' /></li>
            <li><i className='fas fa-check' /></li>
            <li className='empty'></li>
            <li><i className='fas fa-check' /></li>
            <li></li>
            <li className='empty'></li>
            <li></li>
            <li></li>
            <li className='empty'></li>
            <li>5</li>
            <li></li>
            <li className='empty'></li>
            <li></li>
            <li className='empty'></li>
            <li></li>
            <li></li>
            <li></li>
            <li className='dev price'>$25.00/mo</li>
            <li className='price'>$12.50/mo</li>

            {user && user.id && (
              <li className='button'>
                <Button
                  disabled={user.subscription === 1}
                  green={!user.subscription}
                  red={user.subscription === 2}
                  label={!user.subscription
                    ? 'Upgrade'
                    : user.subscription === 1
                      ? 'Current Plan'
                      : 'Downgrade'
                  }

                  onClick={!user.subscription
                    ? () => {
                      Paddle.Checkout.open({ // eslint-disable-line
                        product: 565474,
                        coupon: 'DEVSALE',
                        email: user.email,
                      })
                    } : user.subscription === 2
                      ? () => {
                        navigate('/account')
                      } : () => {}
                  }
                />
              </li>
            )}
          </ul>

          <ul className='dtc-pricingtable__column'>
            <li className='header'>Pro</li>
            <li>Unlimited</li>
            <li>Unlimited</li>
            <li>Unlimited</li>
            <li><i className='fas fa-check' /></li>
            <li className='empty'></li>
            <li><i className='fas fa-check' /></li>
            <li><i className='fas fa-check' /></li>
            <li className='empty'></li>
            <li><i className='fas fa-check' /></li>
            <li><i className='fas fa-check' /></li>
            <li className='empty'></li>
            <li><i className='fas fa-check' /></li>
            <li><i className='fas fa-check' /></li>
            <li className='empty'></li>
            <li>Unlimited</li>
            <li><i className='fas fa-check' /></li>
            <li className='empty'></li>
            <li><i className='fas fa-check' /></li>
            <li className='empty'></li>
            <li><i className='fas fa-check' /></li>
            <li><i className='fas fa-check' /></li>
            <li><i className='fas fa-check' /></li>
            <li className='dev price'>$75.00/mo</li>
            <li className='price'>$37.50/mo</li>

            {user && user.id && (
              <li className='button'>
                <Button
                  green={!user.subscription || user.subscription < 2}
                  disabled={user.subscription === 2}
                  label={user.subscription === 2 ? 'Current Plan' : 'Upgrade'}
                  onClick={!user.subscription
                    ? () => {
                      Paddle.Checkout.open({ // eslint-disable-line
                        product: 565475,
                        coupon: 'DEVSALE',
                        email: user.email,
                      })
                    } : user.subscription === 2
                      ? () => {}
                      : () => navigate('/account')
                  }
                />
              </li>
            )}
          </ul>
        </div>

        {(!user || !user.id) && (
          <div className='dtc-pricingtable__register'>
            <Button
              green
              label='Register Now'
              onClick={onRegister}
            />
          </div>
        )}
      </div>
    )
  }
}
