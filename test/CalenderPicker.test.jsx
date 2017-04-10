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
    expect(wrapper.find('.calender-wrapper')).to.have.length(1)
  })

  it('should render 7 day label component', () => {
    const wrapper = shallow(<CalenderPicker />)
    expect(wrapper.find(getClass('week-label'))).to.have.length(7)
  })

  it('should render 31 days for December', () => {
    const wrapper = shallow(<CalenderPicker date={ '2017/12/1' } />)
    expect(wrapper.find(getClass('active'))).to.be.length(31)
  })

  it('should render 28 days for Febrary', () => {
    const wrapper = shallow(<CalenderPicker date={ '2017/2/1' } />)
    expect(wrapper.find(getClass('active'))).to.be.length(28)
  })

  it('should render 29 days for Febrary in leap year', () => {
    const wrapper = shallow(<CalenderPicker date={ '2016/2/1' } />)
    expect(wrapper.find(getClass('active'))).to.be.length(29)
  })

  it('caption should render 4月 for April', () => {
    const wrapper = shallow(<CalenderPicker date={ '2017/4/1' } />)
    expect(wrapper.find(getClass('caption')).text()).to.contains('4月')
  })

  it('caption should render 42 buttons for type button', () => {
    const wrapper = shallow(<CalenderPicker date={ '2017/4/1' } type={ 'button' } />)
    expect(wrapper.find('button')).to.have.length(42)
  })
})
