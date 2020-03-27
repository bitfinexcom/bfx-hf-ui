import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import AlgoOrdersTable from './AlgoOrdersTable'

configure({ adapter: new Adapter() })

describe('AlgoOrdersTable', () => {
    const data = [{"gid":"1585330269533","name":"MA Crossover","label":"MA Crossover | 1 @ MARKET  | long EMA(1) | short EMA(0)","args":{"shortType":"EMA","longType":"EMA","amount":1,"shortMAPeriod":0,"longMAPeriod":0,"shortEMAPeriod":0,"longEMAPeriod":1,"shortMAPrice":"CLOSE","shortEMAPrice":"CLOSE","longMAPrice":"CLOSE","longEMAPrice":"CLOSE","shortMATF":"1m","longMATF":"1m","shortEMATF":"1m","longEMATF":"1m","orderType":"MARKET","orderPrice":0,"submitDelay":2,"cancelDelay":1,"_margin":false,"_futures":false,"symbol":"tBTCUSD","long":{"type":"ema","candlePrice":"close","candleTimeFrame":"1m","args":[1]},"short":{"type":"ema","candlePrice":"close","candleTimeFrame":"1m","args":[0]}},"exID":"bitfinex"}]
    test('it renders the algo orders table', () => {
        const component = mount((
            <AlgoOrdersTable
                exID={'bitfinex'}
                orders={data}
                cancelOrder={()=>{}}
                apiClientState={2}
            />
        ))
        expect(component).toMatchSnapshot()
    })

    test('cancel order',  (done) => {
        const component = mount((
            <AlgoOrdersTable
                exID={'bitfinex'}
                orders={data}
                cancelOrder={(authToken, ao)=>{
                    expect(ao).toBe(data[0])
                    done()
                }}
                apiClientState={2}
            />
        ))
        component.find('.fa.fa-stop').simulate('click')

    })
})
