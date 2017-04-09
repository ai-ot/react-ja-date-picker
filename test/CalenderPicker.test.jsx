import React       from 'react'
import { shallow } from 'enzyme'
import { expect }  from 'chai'
import CalenderPicker, { CLASS_PREFIX } from '../src/CalenderPicker.jsx'

/**
 * test helper to regularize class prefix
 * @param  {string} word [description]
 * @return {string}      [description]
 */
const getClass = word => '.' + CLASS_PREFIX + word

describe('Test of CalenderPicker Component', () => {

  it('should render .calender-wrapper', () => {
    const wrapper = shallow(<CalenderPicker />)
    expect(wrapper.find(getClass('calender-wrapper'))).to.have.length(1)
  })

  it('should render 7 day label component', () => {
    const wrapper = shallow(<CalenderPicker />)
    expect(wrapper.find(getClass('day-label'))).to.have.length(7)
  })

  it('should render 31 days for December', () => {
    const wrapper = shallow(<CalenderPicker date={ '2017/12/1' } />)
    expect(wrapper.find(getClass('day'))).to.be.length(31)
  })
})
