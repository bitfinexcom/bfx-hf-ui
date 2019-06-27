import React from 'react'
import PLChart from '../../components/PLChart'
import StrategyTable from '../../components/StrategyTable'
import AlgoOrderTable from '../../components/AlgoOrderTable'

export default class DashboardView extends React.PureComponent {
  render() {
    // mock data for design
    const orders = [
      // all we care about is gid & symbol for rendering ([_, gid, _, symbol])
      [null, 0, null, 'tBTCUSD'],
      [null, 0, null, 'tBTCUSD'],
      [null, 0, null, 'tBTCUSD'],
      [null, 0, null, 'tBTCUSD'],
      // note strat (1) is stopped
      ...new Array(20).fill([null, 42, null, 'tLEOUSD']),
    ]

    const strategies = [
      // [gid, name, status, created]
      [0, 'EMA Cross A', true, +(new Date(Date.now() - (24 * 60 * 60 * 1000)))],
      [1, 'EMA Cross B', false, +(new Date(Date.now() - (48 * 60 * 60 * 1000)))],
      [2, 'Bollinger EMA Trend Follower', true, +(new Date(Date.now() - (300 * 60 * 60 * 1000)))],
      [0, 'EMA Cross A', true, +(new Date(Date.now() - (24 * 60 * 60 * 1000)))],
      [1, 'EMA Cross B', false, +(new Date(Date.now() - (48 * 60 * 60 * 1000)))],
      [2, 'Bollinger EMA Trend Follower', true, +(new Date(Date.now() - (300 * 60 * 60 * 1000)))],
      [0, 'EMA Cross A', true, +(new Date(Date.now() - (24 * 60 * 60 * 1000)))],
      [1, 'EMA Cross B', false, +(new Date(Date.now() - (48 * 60 * 60 * 1000)))],
      [2, 'Bollinger EMA Trend Follower', true, +(new Date(Date.now() - (300 * 60 * 60 * 1000)))],
      [0, 'EMA Cross A', true, +(new Date(Date.now() - (24 * 60 * 60 * 1000)))],
      [1, 'EMA Cross B', false, +(new Date(Date.now() - (48 * 60 * 60 * 1000)))],
      [2, 'Bollinger EMA Trend Follower', true, +(new Date(Date.now() - (300 * 60 * 60 * 1000)))],
      [0, 'EMA Cross A', true, +(new Date(Date.now() - (24 * 60 * 60 * 1000)))],
      [1, 'EMA Cross B', false, +(new Date(Date.now() - (48 * 60 * 60 * 1000)))],
      [2, 'Bollinger EMA Trend Follower', true, +(new Date(Date.now() - (300 * 60 * 60 * 1000)))],
      [0, 'EMA Cross A', true, +(new Date(Date.now() - (24 * 60 * 60 * 1000)))],
      [1, 'EMA Cross B', false, +(new Date(Date.now() - (48 * 60 * 60 * 1000)))],
      [2, 'Bollinger EMA Trend Follower', true, +(new Date(Date.now() - (300 * 60 * 60 * 1000)))],
      [0, 'EMA Cross A', true, +(new Date(Date.now() - (24 * 60 * 60 * 1000)))],
      [1, 'EMA Cross B', false, +(new Date(Date.now() - (48 * 60 * 60 * 1000)))],
      [2, 'Bollinger EMA Trend Follower', true, +(new Date(Date.now() - (300 * 60 * 60 * 1000)))],
    ]

    const plTrades = []
    let pl = 0

    // Note P/L chart states 'last 7 days'; keep in mind this is mock data
    for (let i = 0; i < 500; i += 1) {
      pl += Math.floor(Math.random() * 10) * (Math.random() > 0.45 ? 1 : -1)

      plTrades.push({
        date: new Date(Date.now() - (i * 60 * 60 * 1000)),
        pl,
      })
    }

    // TODO: Extract relevant components (i.e. circle status indicator)
    return (
      <div className='hfui_view__wrapper'>
        <h1>Dashboard</h1>

        <div className='hfui_dashboardview__infoheader'>
          <ul className='hfui_dashboardview__infoheader-info'>
            <li>
              <span className='hfui_dashboardview__infoheader-infolabel'>Active Strategies:</span>
              <span className='hfui_dashboardview__infoheader-infovalue'>2</span>
            </li>

            <li>
              <span className='hfui_dashboardview__infoheader-infolabel'>Active Algo Orders:</span>
              <span className='hfui_dashboardview__infoheader-infovalue'>1</span>
            </li>

            <li>
              <span className='hfui_dashboardview__infoheader-infolabel'>Open Orders:</span>
              <span className='hfui_dashboardview__infoheader-infovalue'>16</span>
            </li>

            <br />

            <li>
              <span className='hfui_dashboardview__infoheader-infolabel'>BFX Connection:</span>
              <span className='hfui_dashboardview__infoheader-infovalue'>
                <span className='hfui_dashboardview__infoheader-status green' />
              </span>
            </li>

            <li>
              <span className='hfui_dashboardview__infoheader-infolabel'>Data Server Connection:</span>
              <span className='hfui_dashboardview__infoheader-infovalue'>
                <span className='hfui_dashboardview__infoheader-status green' />
              </span>
            </li>

            <li>
              <span className='hfui_dashboardview__infoheader-infolabel'>Algo Server Connection:</span>
              <span className='hfui_dashboardview__infoheader-infovalue'>
                <span className='hfui_dashboardview__infoheader-status green' />
              </span>
            </li>

            <li>
              <span className='hfui_dashboardview__infoheader-infolabel'>HF VPS Connection:</span>
              <span className='hfui_dashboardview__infoheader-infovalue'>
                <span className='hfui_dashboardview__infoheader-status gray' />
              </span>
            </li>
          </ul>

          <PLChart
            label='Overall P/L Last 7 Days'
            trades={plTrades}
            dataMTS={0}
          />
        </div>

        <StrategyTable
          strategies={strategies}
          orders={orders}
        />

        <AlgoOrderTable
          orders={orders}
        />
      </div>
    )
  }
}
