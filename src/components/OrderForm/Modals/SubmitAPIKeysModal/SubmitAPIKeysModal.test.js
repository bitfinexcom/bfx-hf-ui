import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from "react-redux"
import configureMockStore from "redux-mock-store"
import SubmitAPIKeysModal from './SubmitAPIKeysModal'


const mockStore = configureMockStore()
const store = mockStore({
    exID: 'BFX'
})

configure({ adapter: new Adapter() })

describe('SubmitAPIKeysModal', () => {
    test('render modal', () => {
        const component = mount((
            <Provider store={store}>
                <SubmitAPIKeysModal 
                    exID='bitfinex' 
                />
            </Provider>
        ))
        
        expect(component).toMatchSnapshot()
    })
})