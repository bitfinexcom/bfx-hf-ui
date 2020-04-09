import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import data from './ao.json'
import AlgoOrdersTable from './AlgoOrdersTable'

configure({ adapter: new Adapter() })

describe('AlgoOrdersTable', () => {
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
