import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import CreateNewLayoutModal from './index'

configure({ adapter: new Adapter() })

describe('CreateNewLayout', () => {
    test('should render modal', () => {
        const component = mount((
            <CreateNewLayoutModal />
        ))

        expect(component).toMatchSnapshot()
    })

    test('submit empty input', () => {
        const component = mount((
                <CreateNewLayoutModal
                    onSubmit={() => {}}
                    onClose={() => {}}
                />
        ))

        component.find('.green').simulate('click')
        expect(component.find('.error').length).toBe(1) 
    })

    test('fill api key & api secret', () => {
        const component = mount((
            <CreateNewLayoutModal
                onSubmit={() => {}}
                onClose={() => {}}
            />
    ))
    component.setState({label: 'test_layout'})        
    component.find('.green').simulate('click')
    expect(component.find('.error').length).toBe(0) 
    })
})  