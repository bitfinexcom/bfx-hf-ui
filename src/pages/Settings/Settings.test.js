import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import Settings from './Settings'


const mockStore = configureMockStore()
const store = mockStore({
    ui: {
        activeExchange: 'bitfinex',
    }, 
    settings: {
        dms: true
    }
})

configure({ adapter: new Adapter() })

describe('Settings', () => {
    test('should render settings page', () => {
        const component = mount((
            <Provider store={store} >
                <Settings />
            </Provider>
        ))

        expect(component).toMatchSnapshot()
    })

    test('find two inputs for api key & api secret', () => {
        const component = mount((
            <Provider store={store} >
                <Settings />
            </Provider>
        ))

        expect(component.find('.hfui-settings__option').length).toBe(2)
    })

    test('fill api key & api secret', () => {
        const component = mount((
            <Provider store={store} >
                <Settings />
            </Provider>
        ))

        const payload = {
            target: {
                name: 'apiKey', value: 'api_key_test'
            }
        }
        component.find('input[type="text"]').simulate('change', payload)
    })
})  