import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import AddLayoutComponentModal from './AddLayoutComponentModal'
import {
  COMPONENT_TYPES, COMPONENT_LABELS
} from '../GridLayout/GridLayout.helpers'

const LABELS = Object.values(COMPONENT_LABELS)

configure({ adapter: new Adapter() })

describe('AddLayoutComponentModal', () => {
  test('it renders a dropdown with one of each component type', () => {
    const component = mount((
      <AddLayoutComponentModal
        onSubmit={() => {}}
        onClose={() => {}}
      />
    ))

    expect(component).toMatchSnapshot()
    component.find('.hfui-dropdown__button').simulate('click')

    const dropdown = component.find('.hfui-dropdown__dropdown')

    LABELS.forEach((label) => {
      expect(dropdown.contains(label)).toBe(true)
    })
  })

  test('it shows an error if attempting to submit an unknown component type', () => {
    const component = mount((
      <AddLayoutComponentModal
        onSubmit={() => {}}
        onClose={() => {}}
      />
    ))

    expect(component.find('.error').length).toBe(0)
    expect(component.state('error')).toBe('')

    component.instance().onSubmit('nonexistent-type')

    expect(component.state('error')).not.toBe('')
  })

  test('it calls onSubmit() with the selected component type when confirmed', (done) => {
    const component = mount((
      <AddLayoutComponentModal
        onClose={() => {}}
        onSubmit={(componentType) => {
          expect(componentType).toBe(COMPONENT_TYPES.ORDER_BOOK)
          done()
        }}
      />
    ))

    component.find('.hfui-dropdown__button').simulate('click')

    const obOption = component.find('.hfui-dropdown__dropdown li').findWhere(c => (
      c.text() === COMPONENT_LABELS.ORDER_BOOK && c.prop('onClick')
    ))

    obOption.simulate('click')

    component.find('.hfui-button.green').simulate('click')
  })
})
